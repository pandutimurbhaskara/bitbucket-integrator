import { PullRequestCreatedPayloadType } from "@/constant/types/PullRequestCreated";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebase";
import { randomUUID } from "crypto";
import { PullRequestApprovalPayloadType } from "@/constant/types/PullRequestApproval";
import { PullRequestCommentPayloadType } from "@/constant/types/PullRequestComment";

export async function POST(request: Request) {
  const eventType: string = request.headers.get("x-event-key") || "";
  type IPayload = PullRequestCreatedPayloadType &
    PullRequestApprovalPayloadType &
    PullRequestCommentPayloadType;
  const payload: IPayload = await request.json();
  let response: any;

  const BitbucketWebhookEventType = {
    PullrequestCreated: "pullrequest:created",
    PullrequestApproved: "pullrequest:approved",
    PullrqeustCommentCreated: "pullrequest:comment_created",
  };

  const objectBuilder = (data: Record<string, any>) => {
    return {
      code: 200,
      message: "Success POST data and save to database",
      data: data,
      type: eventType,
    };
  };

  const handlePullRequestCreate = async (
    payload: IPayload,
    eventType: string
  ) => {
    console.log(payload, "payload");

    response = {
      repoName: payload?.repository?.name,
      pullRequestCreatorId: payload?.actor?.account_id,
      pullRequestCreatorName: payload?.actor?.display_name,
      pullRequestTitle: payload?.pullrequest?.title,
      pullRequestCreatedDate: payload?.pullrequest?.created_on,
      type: eventType,
    };
    try {
        console.log('enter try create')
        const id = randomUUID()
      await setDoc(doc(db, "log-pull-request", id), {
        response,
      });
    } catch (error) {
        console.log(error, eventType)
      return Response.json(objectBuilder(response));
    }
  };

  const handlePullRequestApproved = async (
    payload: IPayload,
    eventType: string
  ) => {
    response = {
      repoName: payload?.repository?.name,
      approvalUserId: payload?.approval?.user?.account_id,
      approvalName: payload?.approval?.user?.display_name,
      pullRequestTitle: payload?.pullrequest?.title,
      approvalTime: payload?.approval?.date,
      type: eventType,
    };
    try {
        console.log('enter try approved')
        const id = randomUUID()
      await setDoc(doc(db, "log-pull-request", id), {
        response,
      });
    } catch (error) {
        console.log(error, eventType)
      return Response.json(objectBuilder(response));
    }
  };

  const handlePullRequestCommentCreated = async (
    payload: PullRequestCommentPayloadType,
    eventType: string
  ) => {
    response = {
      repoName: payload?.repository?.name,
      commentUserId: payload?.comment?.user?.account_id,
      approvalName: payload?.comment?.user?.display_name,
      pullRequestTitle: payload?.pullrequest?.title,
      approvalTime: payload?.comment?.created_on,
      type: eventType,
    };
    try {
        console.log('enter try comment')
        const id = randomUUID()
      await setDoc(doc(db, "log-pull-request", id), {
        response,
      });
    } catch (error) {
        console.log(error, eventType)
      return Response.json(objectBuilder(response));
    }
  };

  switch (eventType) {
    case BitbucketWebhookEventType.PullrequestApproved:
      handlePullRequestApproved(payload, eventType);
      break;
    case BitbucketWebhookEventType.PullrequestCreated:
      handlePullRequestCreate(payload, eventType);
      break;
    case BitbucketWebhookEventType.PullrqeustCommentCreated:
      handlePullRequestCommentCreated(payload, eventType);
      break;
    default:
      console.log(payload, "default");
      break;
  }

  return Response.json(objectBuilder(payload));
}

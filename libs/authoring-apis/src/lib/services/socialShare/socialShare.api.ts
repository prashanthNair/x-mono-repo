import {
  FETCH_CONTENT_TYPE_SOCIAL_SHARE_LIST_CALL,
  FETCH_SOCIAL_SHARE_PROFILE,
} from "../../graphQL/queries/socialShareQueries";
import {
  SOCIAL_SHARE_CANCEL_POST,
  SOCIAL_SHARE_RESCHEDULE,
  SOCIAL_SHARE_SCHEDULE,
} from "../../graphQL/mutations/socialShareMutatations";

//FetchQueries
export const fetchSocialShareProfile = FETCH_SOCIAL_SHARE_PROFILE;
export const fetchSocialShareList = FETCH_CONTENT_TYPE_SOCIAL_SHARE_LIST_CALL;

//MutateQueries
export const scheduleSocialShare = SOCIAL_SHARE_SCHEDULE;
export const rescheduleSocialShare = SOCIAL_SHARE_RESCHEDULE;
export const cancelSocialSharePost = SOCIAL_SHARE_CANCEL_POST;

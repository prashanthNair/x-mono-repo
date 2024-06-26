/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Divider } from "@mui/material";
import {
  FETCH_TAG_LIST_QUERY,
  commentsApi,
  contentTypeAPIs,
  useComment,
  useWorkflow,
} from "@platformx/authoring-apis";
import { RootState, previewContent } from "@platformx/authoring-state";
import { CommentListPanel } from "@platformx/comment-review";
import {
  CATEGORY_CONTENT,
  CommonPlateformXDialog,
  Loader,
  ShowToastError,
  ShowToastSuccess,
  capitalizeFirstLetter,
  getCurrentLang,
  getSubDomain,
  handleHtmlTags,
  onBackButtonEvent,
  trimString,
  unloadCallback,
  useUserSession,
  workflowKeys,
} from "@platformx/utilities";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Analytics from "../../components/Analytics/Analytics";
import { CreateHeader } from "../../components/CreateHeader/CreateHeader";
import { ContentType } from "../../enums/ContentType";
import { icons } from "../../utils/Constants";
// import WorkflowHistory from "../WorkflowHistory/WorkflowHistory";
import { WorkflowHistory } from "@platformx/workflow-management";
import { DamContentGallery } from "@platformx/x-image-render";
import { useDispatch, useSelector } from "react-redux";
import ContentPageScroll from "../../components/ContentPageScroll";
import { DRAFT, PUBLISHED } from "./Utils/constants";
import ImageVideo from "./components/ImageVideo";
import Seo from "./components/Seo";
import { TitleDescription } from "./components/TitleDescription";
import AddQuestion from "./components/addQuestion/AddQuestion";
import ChooseTags from "./components/choosetags/ChooseTags";
import Result from "./components/results/Result";
import SocialShare from "./components/socialshare/SocialShare";

export const CreatePoll = (): JSX.Element => {
  const ctype = capitalizeFirstLetter(ContentType.Poll);
  const dispatch = useDispatch();
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const { t, i18n } = useTranslation();
  const params = useParams();
  const updateTempObj = useRef<any>({});
  const { currentContent } = useSelector((state: RootState) => state.content);
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const pollPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>("");
  const currentPollData = useRef(
    pollPageUrl.searchParams.get("path") ? (pollPageUrl.searchParams.get("path") as string) : "",
  );
  const [scrollToView, setscrollToView] = useState<any>();
  const [pollInstance, setPollInstance] = useState<any>({});
  const [onSavedModal, setOnSavedModal] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const unsavedChanges = useRef<boolean>(false);
  const qusUnsavedChanges = useRef<boolean>(false);
  const [, setIsEdited] = useState<boolean>(false);
  const navigate = useNavigate();
  const [previewButton, setPreviewButton] = useState(true);
  const [publishButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const [openAddQestion, setOpenAddQuestion] = useState(false);
  const [isClickedQueList] = useState(false);
  const [, setPublishUrl] = useState("");
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: "",
    title: "",
    description: "",
  });
  const [, setSelectedVideo] = useState({
    Thumbnail: "",
    title: "",
    description: "",
    Url: "",
  });
  const [tagData, setTagData] = useState<any>({});
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagArr, setTagArr] = useState<any>([]);
  const [workflow, setWorkflow] = useState({});
  // const [selectedTag, setselectedTag] = useState<any>([]);
  const [key, setKey] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [parentToolTip, setParentToolTip] = useState("");
  const [addImage, setAddImage] = useState<boolean>(false);
  const scrollDebounceRef = useRef<any>(null);
  const [runFetchTagList] = useLazyQuery(FETCH_TAG_LIST_QUERY);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  // const [socialShareExpanded, setSocialShareExpanded] = useState(
  //   pollPageUrl.searchParams.get("open") ? true : false,
  // );
  const [timerState, setTimerState] = useState(
    localStorage.getItem("contentTypeTimerState") === "true" ? true : false,
  );
  const [lastmodifiedDate, setLastmodifiedDate] = useState(new Date().toISOString());
  const [enableWorkflowHistory, setEnableWorkflowHistory] = useState<boolean>(false);
  const [pollState, setPollState] = useState<any>({
    title: "",
    short_title: "",
    short_description: "",
    description: "",
    imagevideoURL: "",
    colorCode: "",
    thumbnailURL: "",
    socialShareImgURL: "",
    titleSocialShare: "",
    descriptionSocialShare: "",
    tagsSocialShare: [],
    analytics_enable: true,
    impression: true,
    contentInsight: false,
    seo_enable: true,
    seoShared: true,
    scoreBy: t("count"),
    tags: [],
    is_schedule_publish: false,
    schedule_publish_datetime: "",
    is_schedule_unpublish: false,
    schedule_unpublish_datetime: "",
    poll_title: "",
    poll_description: "",
    queBackgroundColor: "",
    queBackgroundImg: "",
    original_image: {},
    published_images: [],
    question_original_image: {},
    question_published_images: [],
  });
  const [answers, setAnswers] = useState<any>([
    { id: "1", option: "", image: "" },
    { id: "2", option: "", image: "" },
  ]);
  const [editedSD, setEditedSD] = useState({});
  const [, setFieldChanges] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const { comments } = useComment();
  const login_user_id = userInfo?.user_id;

  useEffect(() => {
    setIsReload(!isReload);
  }, [comments]);

  useEffect(() => {
    if (Object.keys(pollInstance).length === 0 && !params.id) {
      const newPoll = {
        CommonFields: {
          page: "",
          title: "",
          short_title: "",
          description: "",
          short_description: "",
          category: "Poll",
          site_name: "PlatX",
          page_state: "",
          is_edit: false,
          seo_enable: true,
          analytics_enable: true,
          robot_txt: false,
          sitemap: false,
          analytics: "",
          others: "",
          structure_data: "",
          creationDate: new Date().toISOString(),
          modificationDate: new Date().toISOString(),
          tags: [],
          createdBy: username,
          parent_page_url: "/",
          current_page_url: "",
          page_lastmodifiedby: username,
          settings: {},
        },
        ObjectFields: {
          background_content: {
            objectType: "image",
            Url: "",
            Title: "",
            Thumbnail: "",
            Color: "",
          },
          question_background_content: {
            objectType: "image",
            Url: "",
            Title: "",
            Thumbnail: "",
            Color: "",
            original_image: {},
            published_images: [],
          },
          display_scores: "Count",
          // background_color: "",
          poll_description: "",
          poll_title: "",
          poll_question: "",
          // poll_answer_image: "",
          options_compound_fields: [],
          original_image: {},
          published_images: [],
        },
      };
      setPollInstance(newPoll);
    }
    if (currentPollData.current === "") {
      getWorkflowDetails(role, login_user_id, setWorkflow, capitalizeFirstLetter(ctype));
    }
  }, []);
  const updateField = (updatedPartialObj) => {
    updateTempObj.current = updatedPartialObj;
    const newTempData = JSON.parse(JSON.stringify(pollInstance));
    const tempObjField = {
      background_content: {
        objectType: pollState?.imagevideoURL ? "image" : pollState?.colorCode ? "color" : "",
        Url: pollState?.imagevideoURL,
        Title: "",
        Thumbnail: pollState?.imagevideoURL,
        Color: pollState?.colorCode,
      },
      question_background_content: {
        objectType: pollState?.queBackgroundImg
          ? "image"
          : pollState?.queBackgroundColor
            ? "color"
            : "",
        Url: pollState?.queBackgroundImg,
        Title: "",
        Thumbnail: pollState?.queBackgroundImg,
        Color: pollState?.queBackgroundColor,
        original_image: pollState?.question_original_image,
        published_images: pollState?.question_published_images,
      },
      display_scores: pollState?.scoreBy,
      poll_description: pollState?.poll_description,
      poll_title: pollState?.poll_title,
      poll_question: pollState?.poll_title,
      // poll_answer_image: pollState?.queBackgroundImg,
      is_image_option: addImage,
      options_compound_fields: answers.map((ans) => {
        return {
          option_image: {
            url: addImage ? ans.image : "",
            title: "Option Image",
          },
          is_correct: ans.status,
          option_text: ans.option,
          option_id: ans.id,
        };
      }),
      original_image: pollState?.original_image,
      published_images: pollState?.published_images,
    };
    const modifiedPoll = {
      ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updatedPartialObj,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };
    setPollInstance(modifiedPoll);
  };
  const defPoll = {
    imagevideoURL: "",
    title: "",
    description: "",
    short_title: "",
    short_description: "",
    tags: [],
  };
  const pollRef = useRef<any>(defPoll);
  const tagRef = useRef<any>([]);

  // const [isPublishDisabled, setPublishDisabled] = useState<boolean>(true);
  // const [isPublishPreviewDisabled, setIsPublishPreviewDisabled] = useState<boolean>(false);
  // const [isDraftDisabled, setDraftDisabled] = useState<boolean>(true);
  // const publishViewButtonHandle = () => {
  //   setShowPublishConfirm(false);
  // };
  // const handleSchedulePublish = (isPublish, publishTime, isUnpublish, unPublishTime) => {
  //   setPollState({
  //     ...pollState,
  //     is_schedule_publish: isPublish,
  //     schedule_publish_datetime: publishTime,
  //     is_schedule_unpublish: isUnpublish,
  //     schedule_unpublish_datetime: unPublishTime,
  //   });
  // };
  const updatePollSettings = (pageUrl) => {
    const PollSettings = {
      socialog_url: `${getSubDomain()}/${i18n.language}/poll/${pageUrl}`,
      socialog_type: "poll",
      socialog_sitename: pollRef.current?.title
        ? trimString(handleHtmlTags(pollRef.current?.title), 100)
        : "poll",
      seo_title: pollRef.current?.short_title
        ? trimString(handleHtmlTags(pollRef.current?.short_title), 100)
        : "",
      socialog_title: pollRef.current?.titleSocialShare
        ? trimString(handleHtmlTags(pollRef.current?.titleSocialShare), 100)
        : "",
      socialog_twitter_title: pollRef.current?.titleSocialShare
        ? trimString(handleHtmlTags(pollRef.current?.titleSocialShare), 100)
        : "",
      socialog_description: pollRef.current?.short_description
        ? trimString(handleHtmlTags(pollRef.current?.short_description), 163)
        : "",
      socialog_twitter_description: pollRef.current?.descriptionSocialShare
        ? trimString(handleHtmlTags(pollRef.current?.descriptionSocialShare), 163)
        : "",
      socialog_twitter_url: `${getSubDomain()}/${i18n.language}/poll/${pageUrl}`,
      keywords: pollState?.tagsSocialShare, //pollRef.current.tags,
      seo_keywords: pollRef.current.tags,
      seo_description: pollRef.current?.description
        ? trimString(handleHtmlTags(pollRef.current?.description), 163)
        : "",
      socialog_image: pollRef.current?.socialShareImgURL,
      socialog_twitter_image: pollRef.current?.socialShareImgURL,
      is_schedule_publish: pollState?.is_schedule_publish,
      schedule_publish_datetime: pollState?.schedule_publish_datetime,
      is_schedule_unpublish: pollState?.is_schedule_unpublish,
      schedule_unpublish_datetime: pollState?.schedule_unpublish_datetime,
    };
    return PollSettings;
  };

  const updateCurrentInstance = (pageURL) => {
    const updatedObj = {
      page: pageURL,
      title: pollRef?.current?.title,
      short_title: pollRef?.current?.short_title ? pollRef?.current?.short_title : "",
      description: pollRef?.current?.description,
      short_description: pollRef?.current?.short_description
        ? pollRef?.current?.short_description
        : "",
      tags: pollRef?.current?.tags ? pollRef?.current?.tags : tagRef?.current,
      current_page_url: `/${pageURL}`,
      settings: { ...updatePollSettings(pageURL) },
    };
    updateField(updatedObj);
  };
  const buildUrl = (page_state) => {
    const url =
      currentPollData.current !== ""
        ? page_state === "PUBLISHED"
          ? `${getSubDomain()}/${i18n.language}/poll/${currentPollData.current}`
          : currentPollData.current
        : page_state === "PUBLISHED"
          ? `${getSubDomain()}/${i18n.language}/` +
            `poll/${pollState?.title?.replace(/[^A-Z0-9]+/gi, "-")?.toLowerCase()}`
          : pollState?.title?.replace(/[^A-Z0-9]+/gi, "-")?.toLowerCase();
    return url;
  };
  const updateStructureData = (pageState = "DRAFT") => {
    const PollStructureData = {
      "@context": "https://schema.org",
      "@type": "VoteAction",
      name: pollState?.poll_title,
      description: pollState?.poll_description,
      url: buildUrl(pageState),
      startTime: new Date().toISOString(),
      option: answers?.map((ans) => ans.option),
    };
    return PollStructureData;
  };
  const [createpollmutate] = useMutation(contentTypeAPIs.createContentType);
  const [updatepollmutate] = useMutation(contentTypeAPIs.updateContentType);
  const [publishpollmutate] = useMutation(contentTypeAPIs.publishContentType);
  const location = useLocation();
  // const [publishpollmutate] = useMutation(contentTypeAPIs.publishContentType);
  const [runFetchContentByPath] = useLazyQuery(contentTypeAPIs.fetchContentByPath);
  const taglength = useRef();
  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      colorCode,
    } = pollState;
    const emptyAnswers = answers.filter((ans) => ans.option === "");
    const emptyImageOptions = answers.filter((ans) => ans.image === "");
    const shortDesc = pollState.short_description;
    if (
      title === "" ||
      shortTitle === "" ||
      shortDesc === "" ||
      description === "" ||
      (colorCode === "" && imagevideoURL === "") ||
      pollState?.poll_title === "" ||
      pollState?.poll_description === "" ||
      scoreBy === "" ||
      emptyAnswers.length > 0 ||
      (addImage && emptyImageOptions.length > 0) ||
      tagArr?.length === 0
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [pollState, answers, addImage]);

  useEffect(() => {
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      colorCode,
      poll_title,
      poll_description,
      short_description,
    } = pollRef.current;
    const emptyAnswers = answers.filter((ans) => ans.option === "");
    const emptyImageOptions = answers.filter((ans) => ans.image === "");
    if (
      title === "" ||
      shortTitle === "" ||
      short_description === "" ||
      description === "" ||
      (colorCode === "" && imagevideoURL === "") ||
      poll_title === "" ||
      poll_description === "" ||
      scoreBy === "" ||
      emptyAnswers.length > 0 ||
      (addImage && emptyImageOptions.length > 0) ||
      (taglength.current === 0 && tagArr?.length === 0)
    ) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [pollState, answers, addImage, pollRef.current]);
  const dateFormat = (dataTime) => {
    return dataTime && format(new Date(dataTime), "h:mm aa, dd LLLL");
  };
  // const pageExistPopup = {
  //   saveAsDraftTitle: "Poll already exists!",
  //   saveAsDraftDescription: "Are you sure you want to continue?",
  //   saveAsDraftCloseText: "No",
  //   saveAsDraftConfirmText: "Yes",
  // };
  const publishPopup = useRef({
    publishTitle: "Congratulations!",
    publishDescription:
      "Your Poll has been sent for publishing & will be published in a few seconds.",
    publishCloseText: "Go to Listing",
    publishConfirmText: "View POLL",
  });
  const publishPoll = (pageURL) => {
    const pollToSend = {
      page: pageURL,
    };
    publishpollmutate({
      variables: {
        contentType: ctype,
        input: pollToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);
        if (
          pollState?.is_schedule_publish &&
          pollState?.schedule_publish_datetime &&
          !pollState?.is_schedule_unpublish
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Poll has been scheduled to publish at ${dateFormat(
              new Date(pollState?.schedule_publish_datetime),
            )}`,
          };
          setShowPublishConfirm(true);
        } else if (
          pollState?.is_schedule_unpublish &&
          pollState?.schedule_unpublish_datetime &&
          !pollState?.is_schedule_publish
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Poll has been scheduled to unpublish at ${dateFormat(
              new Date(pollState?.schedule_unpublish_datetime),
            )}`,
          };
          setShowPublishConfirm(true);
        } else if (
          pollState?.is_schedule_unpublish &&
          pollState?.schedule_unpublish_datetime &&
          pollState?.is_schedule_publish &&
          pollState?.schedule_publish_datetime
        ) {
          publishPopup.current = {
            ...publishPopup.current,
            publishDescription: `Your Poll has been scheduled to publish at ${dateFormat(
              new Date(pollState?.schedule_publish_datetime),
            )} & scheduled to unpublish at ${dateFormat(
              new Date(pollState?.schedule_unpublish_datetime),
            )}`,
          };
          setShowPublishConfirm(true);
        } else {
          setShowPublishConfirm(true);
        }
        // ShowToastSuccess(`${t('poll')} ${t('published_toast')}`);
        setPublishUrl(resp?.data?.authoring_publishContent?.current_page_url);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };
  const [pageStatus, setPageStatus] = useState(DRAFT);
  const [workflowStatus, setWorkflowStatus] = useState(true);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState(false);
  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(workflowObj, status);
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() && status === workflowKeys.approve
        ? setShowPublishConfirm(true)
        : setShowWorkflowSubmit(true);
    }
  };
  const createPoll = (
    pageState,
    IsDuplicate = false,
    isWorkflow = true,
    // props = {},
    // event_step = "",
  ) => {
    setIsLoading(true);
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD, url: buildUrl(pageState) }
        : updateStructureData(pageState);
    const newTempData = JSON.parse(JSON.stringify(pollInstance));
    const tempObjField = {
      background_content: {
        objectType: pollState?.imagevideoURL ? "image" : pollState?.colorCode ? "color" : "",
        Url: pollState?.original_image.original_image_relative_path,
        Title: "",
        Thumbnail: pollState?.original_image.original_image_relative_path,
        Color: pollState?.colorCode,
        ext: pollState?.original_image.ext,
      },
      question_background_content: {
        objectType: pollState?.queBackgroundImg
          ? "image"
          : pollState?.queBackgroundColor
            ? "color"
            : "",
        Url: pollState?.queBackgroundImg,
        Title: "",
        Thumbnail: pollState?.queBackgroundImg,
        Color: pollState?.queBackgroundColor,
        original_image: pollState?.question_original_image,
        published_images: pollState?.question_published_images,
      },
      display_scores: pollState?.scoreBy,
      poll_description: pollState?.poll_description,
      poll_title: pollState?.poll_title,
      poll_question: pollState?.poll_title,
      is_image_option: addImage,
      options_compound_fields: answers.map((ans) => {
        return {
          option_image: {
            url: addImage ? ans.image : "",
            title: "Option Image",
          },
          is_correct: ans.status,
          option_text: ans.option,
          option_id: ans.id,
        };
      }),
      original_image: pollState?.original_image,
      published_images: pollState?.published_images,
    };
    const pollToSend = {
      ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updateTempObj.current,
        page_state: pageState,
        structure_data: JSON.stringify(structureData),
        IsConfirm: IsDuplicate,
        seo_enable: pollState?.seo_enable,
        analytics_enable: pollState?.analytics_enable,
        is_featured: isFeatured,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };

    createpollmutate({
      variables: {
        contenttype: ctype,
        input: pollToSend,
      },
    })
      .then((resp) => {
        unsavedChanges.current = false;
        // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());
        if (pageState.toLowerCase() !== PUBLISHED.toLowerCase()) {
          setIsLoading(false);
          if (resp?.data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
            setWorkflowStatus(isWorkflow);
          } else {
            if (!isWorkflow) {
              ShowToastSuccess(`${t("poll")} ${t("saved_toast")}`);
            }
            //setOnSavedModal(true);
            setIsDraft(false);
            const { createdBy } = pollInstance.CommonFields;
            const { title, description } = updateTempObj.current;
            const workflowObj = {
              createdBy,
              title,
              description,
              path: resp?.data?.authoring_createContent?.path,
              workflow_status: workflowKeys.draft,
              tag_name: capitalizeFirstLetter(ctype),
              last_modifiedBy: createdBy,
            };
            setWorkflow({ ...workflow, ...workflowObj });
            if (isWorkflow) {
              workflowSubmitRequest(workflowObj, workflowKeys.approve);
            }
          }
        } else {
          if (resp?.data?.authoring_createContent?.isExist === true) {
            setOpenPageExistModal(true);
            setPageStatus(pageState);
          } else {
            publishPoll(
              resp?.data?.authoring_createContent?.path.substring(
                resp?.data?.authoring_createContent?.path.lastIndexOf("/") + 1,
              ),
            );
          }
        }
        const pageUrl = resp?.data?.authoring_createContent?.path.substring(
          resp?.data?.authoring_createContent?.path.lastIndexOf("/") + 1,
        );
        pollRef.current.page = pageUrl;
        setDraftPageURL(pageUrl);
        // const tagArrTemp = { ...poll.current };
        // delete tagArrTemp.Description;
        // const res = Object.keys(tagArrTemp).every((keyName) => tagArrTemp[keyName]);
        // if (res && Object.keys(tagArrTemp).length > 0 && tagArrTemp.tags.length > 0) {
        //   setPublishDisabled(false);
        // } else {
        //   setPublishDisabled(true);
        // }
      })
      .catch((error) => {
        setTimerState(false);
        setLastmodifiedDate("");
        if (error?.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };
  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    if (pageStatus.toLowerCase() === DRAFT.toLowerCase()) {
      createPoll(DRAFT, true, workflowStatus);
    } else if (pageStatus.toLowerCase() === PUBLISHED.toLowerCase()) {
      createPoll(PUBLISHED, true);
    }
  };
  const pageExistCloseHandle = () => {
    unsavedChanges.current = true;
    setOpenPageExistModal(false);
    setIsLoading(false);
  };
  useEffect(() => {
    if (timerState) {
      localStorage.setItem("contentTypeTimerState", "true");
    }
  }, [timerState]);
  const updatePOLL = (status, isWorkflow = true, props = {}, event_step = "") => {
    setIsLoading(true);
    const structureData =
      Object.keys(editedSD).length > 0
        ? { ...editedSD, url: buildUrl(status) }
        : updateStructureData(status);
    const newTempData = JSON.parse(JSON.stringify(pollInstance));
    const tempObjField = {
      background_content: {
        objectType: pollState?.imagevideoURL ? "image" : pollState?.colorCode ? "color" : "",
        Url: pollState?.original_image.original_image_relative_path,
        Title: "",
        Thumbnail: pollState?.original_image.original_image_relative_path,
        Color: pollState?.colorCode,
        ext: pollState?.original_image.ext,
      },
      question_background_content: {
        objectType: pollState?.queBackgroundImg
          ? "image"
          : pollState?.queBackgroundColor
            ? "color"
            : "",
        Url: pollState?.queBackgroundImg,
        Title: "",
        Thumbnail: pollState?.queBackgroundImg,
        Color: pollState?.queBackgroundColor,
        original_image: pollState?.question_original_image,
        published_images: pollState?.question_published_images,
      },
      display_scores: pollState?.scoreBy,
      poll_description: pollState?.poll_description,
      poll_title: pollState?.poll_title,
      poll_question: pollState?.poll_title,
      is_image_option: addImage,
      options_compound_fields: answers.map((ans) => {
        return {
          option_image: {
            url: addImage ? ans.image : "",
            title: "Option Image",
          },
          is_correct: ans.status,
          option_text: ans.option,
          option_id: ans.id,
        };
      }),
      original_image: pollState?.original_image,
      published_images: pollState?.published_images,
    };
    const updatePollToSend = {
      // ...newTempData,
      CommonFields: {
        ...newTempData.CommonFields,
        ...updateTempObj.current,
        structure_data: JSON.stringify(structureData),
        current_page_url: `/${
          currentPollData.current !== "" ? currentPollData.current : draftPageURL
        }`,
        page: draftPageURL ? draftPageURL : currentPollData.current,
        page_state: status,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        createdBy: username,
        page_lastmodifiedby: username,
        parent_page_url: "/",
        seo_enable: pollState?.seo_enable,
        analytics_enable: pollState?.analytics_enable,
        title: pollState?.title,
        description: pollState?.description,
        short_title: pollState?.short_title,
        short_description: pollState?.short_description,
        is_featured: isFeatured,
      },
      ObjectFields: {
        ...newTempData.ObjectFields,
        ...tempObjField,
      },
    };
    // delete updatePollToSend.__typename;
    updatepollmutate({
      variables: {
        contenttype: ctype,
        input: updatePollToSend,
      },
    })
      .then(() => {
        setTimerState(true);
        setLastmodifiedDate(new Date().toISOString());
        if (status && status?.toLowerCase() === DRAFT.toLowerCase()) {
          setIsLoading(false);
          if (!isWorkflow) {
            ShowToastSuccess(`${t("poll")} ${t("updated_toast")}`);
          } else {
            workflowSubmitRequest(props, event_step);
          }
          unsavedChanges.current = false;
          // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
          setShowExitWarning(false);
          setIsEdited(false);
        } else {
          publishPoll(draftPageURL ? draftPageURL : currentPollData.current);
        }
      })
      .catch(() => {
        setTimerState(false);
        setLastmodifiedDate("");
        ShowToastError(t("api_error_toast"));
        setIsLoading(false);
        // console.log(JSON.stringify(error, null, 2));
      });
  };
  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
    setShowWorkflowSubmit(false);
  };
  const savePoll = (status = true, props = {}, event_step = "") => {
    // dispatch(previewContent({}));
    setShowExitWarning(false);

    setPollState({
      ...pollState,
      tags: tagArr,
    });

    if (pollState?.title === "") {
      ShowToastError(`${t("title")} ${t("is_required")}`);
    } else if (pollState?.description === "") {
      ShowToastError(`${t("description")} ${t("is_required")}`);
    } else if (
      pollState?.is_schedule_publish &&
      (pollState?.schedule_publish_datetime === "" || pollState?.schedule_publish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_publish")} ${t("time")} ${t("is_required")}`);
    } else if (
      pollState?.is_schedule_unpublish &&
      (pollState?.schedule_unpublish_datetime === "" ||
        pollState?.schedule_unpublish_datetime === null)
    ) {
      ShowToastError(`${t("scheduled_unpublish")} ${t("time")} ${t("is_required")}`);
    } else {
      const pageURL = currentPollData.current
        ? currentPollData.current
        : pollRef?.current?.title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      updateCurrentInstance(pageURL);

      if (showExitWarning) {
        setShowExitWarning(false);
        setIsEdited(false);
      }
      if (!currentPollData.current && isDraft) {
        createPoll(DRAFT, false, status);
      } else {
        updatePOLL(DRAFT, status, props, event_step);
      }
    }
  };

  const publish = () => {
    // dispatch(previewContent({}));
    setPollState({
      ...pollState,
      tags: tagArr,
    });
    const {
      title,
      short_title: shortTitle,
      description,
      scoreBy,
      imagevideoURL,
      colorCode,
      queBackgroundColor,
      queBackgroundImg,
    } = pollState;
    const emptyAnswers = answers.filter((ans) => ans.option === "");
    const emptyImageOptions = answers.filter((ans) => ans.image === "");
    const shortDesc = pollState.short_description;
    if (title === "") {
      ShowToastError(`${t("title")} ${t("is_required")}`);
    } else if (shortTitle === "") {
      ShowToastError(`${t("short_title")} ${t("is_required")}`);
    } else if (shortDesc === "") {
      ShowToastError(`${t("short_description")} ${t("is_required")}`);
    } else if (description === "") {
      ShowToastError(`${t("description")} ${t("is_required")}`);
    } else if (colorCode === "" && imagevideoURL === "") {
      ShowToastError(`${t("banner_image")} ${t("is_required")}`);
    } else if (pollState?.poll_title === "") {
      ShowToastError(`${t("poll")} ${t("question")} ${t("title")} ${t("is_required")}`);
    } else if (pollState?.poll_description === "") {
      ShowToastError(`${t("poll")} ${t("question")} ${t("description")} ${t("is_required")}`);
    } else if (queBackgroundColor === "" && queBackgroundImg === "") {
      ShowToastError(`${t("poll")} ${t("question")} ${t("banner_image")} ${t("is_required")}`);
    } else if (emptyAnswers.length > 0) {
      ShowToastError(`${t("answers")} ${t("is_required")}`);
    } else if (addImage && emptyImageOptions.length > 0) {
      ShowToastError(t("empty_images"));
    } else if (scoreBy === "") {
      ShowToastError(`${t("score")} ${t("is_required")}`);
    } else if (pollState?.is_schedule_publish && pollState?.schedule_publish_datetime === "") {
      ShowToastError(`${t("scheduled_publish")} ${t("is_required")}`);
    } else if (pollState?.is_schedule_unpublish && pollState?.schedule_unpublish_datetime === "") {
      ShowToastError(`${t("scheduled_unpublish")} ${t("is_required")}`);
    } else if (tagArr?.length === 0) {
      ShowToastError(t("tag_error"));
    } else {
      const pageURL = currentPollData.current
        ? currentPollData.current
        : pollRef?.current?.title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
      updateCurrentInstance(pageURL);

      if (showExitWarning) {
        setShowExitWarning(false);
        setIsEdited(false);
      }

      if (!currentPollData.current && isDraft) {
        createPoll(PUBLISHED, false, false);
      } else {
        updatePOLL(PUBLISHED, false);
      }
    }
  };

  const handleSelectedImage = (image, keyName, id?: any) => {
    setSelectedImage(image);
    try {
      // const payload = {s
      //   bitstreamId: image.bitStreamId,
      //   visibility: "public",
      // };
      // const response = await postRequest("api/v1/assets/image/no-crop", payload);
      // const relativeUrl = `${response?.original_image_relative_path}.${response?.ext}`;
      if (key === "imagevideoURL") {
        setPollState({
          ...pollState,
          [key]: image?.Thumbnail,
          thumbnailURL: image?.Thumbnail,
          // socialShareImgURL: relativeUrl,
        });
        pollRef.current = {
          ...pollRef.current,
          [key]: image?.Thumbnail,
          // socialShareImgURL: relativeUrl,
        };

        unsavedChanges.current = true;
        setIsEdited(true);
      } else if (key === "answers") {
        setAnswers(
          answers.map((answer) =>
            answer.id === answerId ? { ...answer, image: image?.Thumbnail } : answer,
          ) as [],
        );
      } else {
        setPollState({ ...pollState, [keyName]: image?.Thumbnail });
        pollRef.current = {
          ...pollRef.current,
          [keyName]: image?.Thumbnail,
          // socialShareImgURL: relativeUrl,
        };
        unsavedChanges.current = true;
      }
    } catch (error) {
      if (keyName === "imagevideoURL") {
        setPollState({
          ...pollState,
          [keyName]: image?.Thumbnail,
          thumbnailURL: image?.Thumbnail,
          socialShareImgURL: "",
        });
        pollRef.current = {
          ...pollRef.current,
          [keyName]: image?.Thumbnail,
          socialShareImgURL: "",
        };

        unsavedChanges.current = true;
        setIsEdited(true);
      } else if (keyName === "answers") {
        setAnswers(
          answers.map((answer) =>
            answer.id === id ? { ...answer, image: image?.Thumbnail } : answer,
          ) as [],
        );
      } else {
        setPollState({ ...pollState, [keyName]: image?.Thumbnail });
        pollRef.current = {
          ...pollRef.current,
          [keyName]: image?.Thumbnail,
          socialShareImgURL: "",
        };
        unsavedChanges.current = true;
      }
      keyName === "socialShareImgURL" && ShowToastError(t("api_error_toast"));
    }
  };
  // const handleSelectedVideo = (video, id) => {
  //   setSelectedVideo(video);
  //   setPollState({
  //     ...pollState,
  //     title: video?.title,
  //     description: video?.description,
  //     imagevideoURL: video?.imagevideoURL,
  //     thumbnailURL: video?.thumbnailURL,
  //   });
  // };
  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      title: "",
      Thumbnail: "",
      description: "",
    });
    setSelectedVideo({
      title: "",
      Thumbnail: "",
      description: "",
      Url: "",
    });
  };
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type === "cancel") {
      setImageOrVideoToDefault();
    }
  };
  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setKey(keyName);
    if (id) {
      setAnswerId(id);
    }
  };
  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      // dispatch(previewContent({}));
      navigate("/content/poll");
    }
  };
  const handleTagOnChange = (event) => {
    let tagsArray = [...tagArr];

    if (event.target.checked && tagsArray?.length > 14) {
      event.target.checked = false;
      ShowToastError(t("allowed_tags_toast"));
    } else {
      if (event.target.checked) {
        tagsArray = [...tagArr, event.target.value];
      } else {
        tagsArray.splice(tagArr.indexOf(event.target.value), 1);
      }
      setTagArr(tagsArray);
      setPollState({
        ...pollState,
        tagsSocialShare: tagsArray,
      });
      pollRef.current = {
        ...pollRef.current,
        tags: tagsArray,
        tagsSocialShare: isDraft ? tagsArray : tagsArray, //[...pollState.tagsSocialShare],
      };
      setIsEdited(true);
      unsavedChanges.current = true;
    }
  };

  const crossButtonHandle = () => {
    setShowExitWarning(false);
    setOnSavedModal(false);
    navigate(`?path=${pollRef.current?.page}`);
  };

  // const saveAsDraftPopup = {
  //   saveAsDraftTitle: "Saved as draft",
  //   saveAsDraftDescription: "Your Poll has been saved successfully!",
  //   saveAsDraftCloseText: "Edit",
  //   saveAsDraftConfirmText: "Go to Poll Listing",
  // };

  const saveQuestionCallBack = (queTitle, queDesc) => {
    setPollState({
      ...pollState,
      poll_title: queTitle,
      poll_description: queDesc,
    });

    // setOpenAddQuestion(false);
  };

  useEffect(() => {
    setIsEditMode(true);
    if (Object.keys(currentContent).length > 0) {
      setPollState(currentContent);
      pollRef.current = currentContent;
      setAnswers(
        currentContent?.options_compound_fields.map((x) => {
          return {
            id: x.option_id,
            option: x.option_text,
            image: x.option_image.url,
          };
        }),
      );
      setTagArr(currentContent?.tags);
      setWorkflow(currentContent.workflow);
    } else if (currentPollData.current && unsavedChanges.current !== true) {
      setIsLoading(true);
      runFetchContentByPath({
        variables: { contentType: ctype, path: currentPollData.current },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            setIsLoading(false);
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            const {
              title,
              short_title: shortTitle,
              short_description: shortDesc,
              description,
              background_content: backgroundContent,
              question_background_content: questionBackgroundContent,

              display_scores: scoreBy,
              tags,
              settingsProperties,
              poll_title: pollTitle,
              poll_description: pollDesc,
              is_image_option: isImgOpt,
              options_compound_fields: options,
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              task_status,
              user_id,
              user_name,
              is_featured,
            } = contentObj;
            setIsFeatured(is_featured);
            setWorkflow({
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              role,
              title,
              enable: stages?.length > 0 ? true : false,
              login_user_id,
              task_status,
              task_user_id: user_id,
              task_user_name: user_name,
            });
            const temp = options.map((x) => {
              return {
                id: x.option_id,
                option: x.option_text,
                image: x.option_image.url,
              };
            });
            setAddImage(isImgOpt);
            setAnswers([...temp]);
            const tempObj = {
              ...pollState,
              title: title,
              short_title: shortTitle,
              short_description: shortDesc,
              description: description,
              imagevideoURL: backgroundContent?.Url,
              colorCode: backgroundContent?.Color,
              poll_title: pollTitle,
              poll_description: pollDesc,
              queBackgroundColor: questionBackgroundContent?.Color,
              queBackgroundImg: questionBackgroundContent?.Url,
              scoreBy: scoreBy,
              tags: tags,
              is_schedule_publish: settingsProperties?.is_schedule_publish,
              is_schedule_unpublish: settingsProperties?.is_schedule_unpublish,
              schedule_publish_datetime: settingsProperties?.schedule_publish_datetime,
              schedule_unpublish_datetime: settingsProperties?.schedule_unpublish_datetime,
              socialShareImgURL: settingsProperties?.socialog_image,
              titleSocialShare: settingsProperties?.socialog_title,
              descriptionSocialShare: settingsProperties?.socialog_description,
              tagsSocialShare: settingsProperties?.keywords,
              seo_enable: res?.data?.authoring_getCmsContentByPath?.seo_enable,
              structure_data: res?.data?.authoring_getCmsContentByPath?.structure_data,
              analytics_enable: res?.data?.authoring_getCmsContentByPath?.analytics_enable,
              original_image: contentObj.original_image,
              published_images: contentObj.published_images,
              question_original_image: contentObj.question_background_content.original_image,
              question_published_images: contentObj.question_background_content.published_images,
            };
            setPollState(tempObj);
            setPollInstance({
              ...tempObj,
              options_compound_fields:
                res?.data?.authoring_getCmsContentByPath?.options_compound_fields,
              page_state: res?.data?.authoring_getCmsContentByPath?.page_state,
            });
            pollRef.current = {
              title: res?.data?.authoring_getCmsContentByPath?.title,
              short_title: res?.data?.authoring_getCmsContentByPath?.short_title,
              short_description: res?.data?.authoring_getCmsContentByPath?.short_description,
              description: res?.data?.authoring_getCmsContentByPath?.description,
              imagevideoURL: res?.data?.authoring_getCmsContentByPath?.background_content?.Url,
              tags: res?.data?.authoring_getCmsContentByPath?.tags,
              titleSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_title,
              descriptionSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_description,
              socialShareImgURL:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties?.socialog_image,
              tagsSocialShare:
                res?.data?.authoring_getCmsContentByPath?.settingsProperties?.keywords,
            };
            setTagArr(res?.data?.authoring_getCmsContentByPath?.tags);
            taglength.current = res?.data?.authoring_getCmsContentByPath?.tags?.length;
          }
        })
        .catch(() => {
          // console.log(JSON.stringify(err, null, 2));
        });
    }
  }, [currentContent]);

  useEffect(() => {
    if (Object.keys(tagData).length === 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
            setscrollToView(
              pollPageUrl.searchParams.get("open")
                ? (pollPageUrl.searchParams.get("open") as string)
                : "",
            );
          }
        })
        .catch(() => {
          // console.log(JSON.stringify(err, null, 2));
        });
    }
  }, []);

  const isInViewport = (element) => {
    const mainElement = document.querySelector(`#${element}`);
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect();
      return (
        rect.top <= window.pageYOffset + window.innerHeight &&
        rect.left <= window.pageXOffset + window.innerWidth &&
        rect.top >= window.pageYOffset &&
        rect.left >= window.pageXOffset
      );
    }
    return false;
  };
  const scrollHandler = () => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }
    const timeOutId = setTimeout(() => {
      const container = document.getElementById("scrollableDiv");
      const active = icons.find((i) => isInViewport(i.id));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
      if (
        container &&
        Math.abs(container?.scrollHeight - container?.clientHeight - container?.scrollTop) < 1
      ) {
        setParentToolTip("seo");
      }
    }, 100);
    scrollDebounceRef.current = timeOutId;
  };

  useEffect(() => {
    const dataHolder = document.getElementById("scrollableDiv");
    dataHolder?.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const closeButtonHandle = () => {
    if (qusUnsavedChanges.current === true) {
      setOpenAddQuestion(false);
      setShowExitWarning(false);
      qusUnsavedChanges.current = false;
    } else {
      // dispatch(previewContent({}));
      navigate("/content/poll");
    }
  };
  // const handleQuesReturn = () => {
  //   if (qusUnsavedChanges.current === true) {
  //     setShowExitWarning(true);
  //   } else {
  //     setOpenAddQuestion(false);
  //   }
  // };
  const navigateTo = () => {
    navigate("/content/poll");
    // dispatch(previewContent({}));
  };
  const handelPreview = () => {
    const backgroundContent = {
      objectType: pollState?.imagevideoURL ? "image" : pollState?.colorCode ? "color" : "",
      Url: pollState?.thumbnailURL,
      Color: pollState?.colorCode,
    };
    const questionBackgroundContent = {
      objectType: pollState?.queBackgroundImg
        ? "image"
        : pollState?.queBackgroundColor
          ? "color"
          : "",
      Url: pollState?.queBackgroundImg,
      Title: "",
      Thumbnail: pollState?.queBackgroundImg,
      Color: pollState?.queBackgroundColor,
    };
    const optionsCompoundFields = answers.map((ans) => {
      return {
        option_image: {
          url: addImage ? ans.image : "",
          title: "Option Image",
        },
        is_correct: ans.status,
        option_text: ans.option,
        option_id: ans.id,
      };
    });
    const tempObj = {
      ...pollState,
      background_content: backgroundContent,
      options_compound_fields: optionsCompoundFields,
      question_background_content: questionBackgroundContent,
      contentType: ctype,
      workflow: workflow,
    };
    dispatch(previewContent(tempObj));
    navigate("/content/preview");
  };

  useEffect(() => {
    if (unsavedChanges.current === true) {
      window.history.pushState(null, "", window.location.pathname + location?.search);
      window.addEventListener("beforeunload", (e) => unloadCallback(e, unsavedChanges.current));
      window.addEventListener("popstate", (e) =>
        onBackButtonEvent(e, unsavedChanges.current, setShowExitWarning),
      );
    }
    return () => {
      window.removeEventListener("beforeunload", (e) => unloadCallback(e, unsavedChanges.current));
      window.removeEventListener("popstate", (e) =>
        onBackButtonEvent(e, unsavedChanges.current, setShowExitWarning),
      );
    };
  }, [unsavedChanges.current]);
  useEffect(() => {
    // dispatch(checkIfUnsavedChanges(unsavedChanges.current));
  }, [pollState]);
  //create comment
  const createComment = () => {
    const currentLanguage = getCurrentLang();
    const createCommentRequest = {
      document_path: `/content/documents/hclplatformx/${currentLanguage}/poll/${currentPollData.current}`,
      status: false,
      document_type: "Poll",
      created_by: username,
      last_modified_by: username,
      reviewer_comments: [comments],
    };

    return commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
  };

  useEffect(() => {
    if (!currentPollData.current && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: "Polls",
        },
      });
    }
  }, [tagData?.length > 0]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFF",
        }}>
        {galleryState && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={"Image"}
            dialogOpen={galleryState}
            isCrop={false}
          />
        )}
      </Box>

      <Box
        sx={{
          display: isClickedQueList || openAddQestion ? "none" : "initial",
        }}>
        {isLoading && <Loader />}
        <Box>
          <Box>
            <CreateHeader
              hasPreviewButton={previewButton}
              handelPreview={handelPreview}
              createText={currentPollData.current ? t("edit_poll") : t("create_poll")}
              handleReturn={returnBack}
              isQuiz
              hasPublishButton={publishButton}
              hasSaveButton={saveButton}
              handleSaveOrPublish={savePoll}
              publishText={t("publish")}
              saveText={t("save_as_draft")}
              previewText={t("preview")}
              toolTipText={t("preview_tooltip")}
              saveVariant='secondaryButton'
              handlePublish={publish}
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Poll}
              workflow={workflow}
              hasTimerState={timerState}
              lastModifiedDate={lastmodifiedDate}
              setEnableWorkflowHistory={setEnableWorkflowHistory}
              createComment={createComment}
              setIsFeatured={setIsFeatured}
              isFeatured={isFeatured}
            />
            <Divider></Divider>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: {
                sm: "calc(100vh - 125px)",
                xs: "calc(100vh - 45px)",
              },
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            id='scrollableDiv'>
            {!isClickedQueList && !galleryState && !enableWorkflowHistory && (
              <Box
                sx={{
                  position: "fixed",
                  top: "25%",
                  right: { sm: "5px", xs: 0 },
                  zIndex: 1000,
                }}>
                <ContentPageScroll
                  icons={icons}
                  parentToolTip={parentToolTip}
                  scrollToView={scrollToView}
                />
              </Box>
            )}
            {enableWorkflowHistory ? (
              <WorkflowHistory
                workflow={workflow}
                setEnableWorkflowHistory={setEnableWorkflowHistory}
              />
            ) : (
              <>
                <TitleDescription
                  state={pollState}
                  setState={setPollState}
                  // setSaveButton={setSaveButton}
                  unsavedChanges={unsavedChanges}
                  pollRef={pollRef}
                  isDraft={isDraft}
                  setFieldChanges={setFieldChanges}
                />
                <ImageVideo
                  state={pollState}
                  setState={setPollState}
                  pollRef={pollRef}
                  unsavedChanges={unsavedChanges}
                />
                <AddQuestion
                  // saveQuestionCallBack={saveQuestionCallBack}
                  qusUnsavedChanges={unsavedChanges}
                  showGallery={showGallery}
                  state={pollState}
                  setState={setPollState}
                  answers={answers}
                  setAnswers={setAnswers}
                  addImage={addImage}
                  setAddImage={setAddImage}
                  setFieldChanges={setFieldChanges}
                  // selectedImage={selectedImage}
                />
                <Result state={pollState} setState={setPollState} />
                <ChooseTags
                  tagData={tagData}
                  selectedTag={tagArr}
                  handleTagOnChange={handleTagOnChange}
                  isEdit={currentPollData.current ? true : false}
                />
                <SocialShare
                  state={pollState}
                  setState={setPollState}
                  pollRef={pollRef}
                  unsavedChanges={unsavedChanges}
                />
                <Analytics
                  number='08'
                  state={pollState}
                  setState={setPollState}
                  unsavedChanges={unsavedChanges}
                />
                <Seo
                  state={pollState}
                  setState={setPollState}
                  setEditedSD={setEditedSD}
                  pollInstance={pollInstance}
                  unsavedChanges={unsavedChanges}
                  updateStructureData={updateStructureData}
                  answers={answers}
                />
              </>
            )}
          </Box>
        </Box>
        <CommonPlateformXDialog
          isDialogOpen={showExitWarning}
          title={t("save_warn_title")}
          subTitle={t("save_warn_subtitle")}
          closeButtonText={t("stay_here")}
          confirmButtonText={t("take_me_out")}
          closeButtonHandle={() => {
            setShowExitWarning(false);
          }}
          confirmButtonHandle={closeButtonHandle}
          modalType='unsavedChanges'
        />
        {/* <PlateformXDialog
          isDialogOpen={onSavedModal}
          title={t("save_as_draft")}
          subTitle={t("poll_draft_subtitle")}
          closeButtonText={t("edit")}
          confirmButtonText={t("go_to_listing")}
          closeButtonHandle={crossButtonHandle}
          confirmButtonHandle={() => navigate("/content/poll")}
          crossButtonHandle={crossButtonHandle}
          modalType='draft'
          closeIcon={<CreateRoundedIcon />}
        /> */}
        {showPublishConfirm || showWorkflowSubmit ? (
          <CommonPlateformXDialog
            isDialogOpen={showPublishConfirm || showWorkflowSubmit}
            title={t("congratulations")}
            subTitle={
              showPublishConfirm
                ? `${t("your")} ${t("poll")} ${t("publish_popup_message")}`
                : t("requested_action")
            }
            closeButtonHandle={handleCloseDialog}
            confirmButtonText={t("go_to_listing")}
            confirmButtonHandle={() => navigate("/content/poll")}
            modalType='publish'
          />
        ) : null}
        {openPageExistModal ? (
          <CommonPlateformXDialog
            isDialogOpen={openPageExistModal}
            title={`${t("poll")} ${t("already_exists")}`}
            subTitle={t("conformation")}
            closeButtonText={t("no")}
            confirmButtonText={t("yes")}
            closeButtonHandle={pageExistCloseHandle}
            confirmButtonHandle={pageExistYesButtonHandle}
            modalType=''
          />
        ) : null}
      </Box>
      <CommentListPanel></CommentListPanel>
    </>
  );
};

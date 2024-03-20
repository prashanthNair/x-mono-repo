/* eslint-disable react-hooks/rules-of-hooks */
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentListing,
  useContentSearch,
} from "@platformx/authoring-apis";
import { RootState } from "@platformx/authoring-state";
import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ContentListing from "../ContentListing/ContentListing";
import ContentListingHeader from "../ContentListingHeader/ContentListingHeader";
import CreateNewPage from "../../pages/page/CreateNewPage";

const ContListingContainer = ({ contentType }: { contentType: string }) => {
  const navigate = useNavigate();
  const startIndex = 0;
  const location = useLocation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDialogOpen, setOpenCreatePage] = useState(false);

  const [filterValue, setFilterValue] = useState("ALL");
  const { contentArray } = useSelector((state: RootState) => state.content);
  const { loading, refetch, fetchMore } = useContentSearch({
    contentType,
    locationState: location,
    filter: filterValue,
    startIndex,
    reloadContent: false,
  });

  const closeButtonHandle = () => {
    setOpenCreatePage(false);
  };

  const {
    deleteContent,
    duplicate,
    preview,
    unPublish,
    view,
    edit,
    editPage,
    fetchContentDetails,
    duplicateToSite,
  } = useContentListing("ALL");

  const memoizedMethods = useMemo(
    () => ({
      deleteContent: useMemo(() => deleteContent, [deleteContent]),
      duplicate: useMemo(() => duplicate, [duplicate]),
      preview: useMemo(() => preview, [preview]),
      unPublish: useMemo(() => unPublish, [unPublish]),
      view: useMemo(() => view, [view]),
      edit: useMemo(() => edit, [edit]),
      editPage: useMemo(() => editPage, [editPage]),
      fetchContentDetails: useMemo(() => fetchContentDetails, [fetchContentDetails]),
      duplicateToSite: useMemo(() => duplicateToSite, [duplicateToSite]),
    }),
    [
      deleteContent,
      duplicate,
      preview,
      unPublish,
      view,
      edit,
      editPage,
      fetchContentDetails,
      duplicateToSite,
    ],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsSpinning(true);
      await refetch();
      setIsSpinning(false);
    };

    fetchData();
  }, [contentType]);

  const createContentNew = () => {
    if (contentType?.trim()?.toLowerCase() === "sitepage") {
      setOpenCreatePage(true);
    } else {
      navigate(`/content/create`, { state: contentType?.trim()?.toLowerCase() });
    }
  };

  const handleFilter = (filter: string) => {
    setFilterValue(filter);
  };

  const handleRefresh = () => {
    setIsSpinning(true);
    refetch();
  };

  const handleFetchMore = async () => {
    await fetchMore();
  };

  return (
    <>
      <ContentListingHeader
        handleFilter={handleFilter}
        title={contentType}
        category={CATEGORY_CONTENT}
        subCategory={CONTENT_TYPES}
        handleAddNew={createContentNew}
        handleRefresh={handleRefresh}
        animationState={isSpinning}
      />

      <ContentListing
        content={contentType}
        contentList={contentArray}
        deleteContent={memoizedMethods.deleteContent}
        dataList={contentArray}
        fetchMore={handleFetchMore}
        preview={memoizedMethods.preview}
        unPublish={memoizedMethods.unPublish}
        view={memoizedMethods.view}
        edit={memoizedMethods.edit}
        editPage={memoizedMethods.editPage}
        loading={loading}
        duplicate={memoizedMethods.duplicate}
        fetchContentDetails={memoizedMethods.fetchContentDetails}
        duplicateToSite={memoizedMethods.duplicateToSite}
      />

      <CreateNewPage
        isDialogOpen={isDialogOpen}
        closeButtonHandle={closeButtonHandle}></CreateNewPage>
    </>
  );
};

export default memo(ContListingContainer);

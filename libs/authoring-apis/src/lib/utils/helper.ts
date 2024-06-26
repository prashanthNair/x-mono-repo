/* eslint-disable no-restricted-globals */
import { LanguageList, dateFormat, handleHtmlTags, trimString } from "@platformx/utilities";
import { DefaultLocale } from "./constants";

export const getCurrentLang = () => {
  let lang = "";
  const split = location.pathname.split("/");

  if (LanguageList().find((x) => x.id === split[2])) {
    const [, , selectedLanugage] = split;
    lang = selectedLanugage;
  } else {
    lang = DefaultLocale;
  }
  return lang;
};

export const getSelectedSite = () => {
  const splitPath = window?.location.pathname.split("/");
  const [, x] = splitPath;
  const site = x;
  if (["en", "fr", "de"].includes(site)) {
    return localStorage.getItem("selectedSite") || "";
  }

  return site || "";
};

export const getLocale = (language: string, location: string) => {
  if (language === "en") return `${language}`;
  return `${language}_${location}`;
};

export const sortedData = (data: any[]) => {
  return data?.sort(
    (a, b) =>
      (b?.last_modification_date || b?.last_modified_date) -
      (a?.last_modification_date || a?.last_modified_date),
  );
};

export const formatUrl = (enteredVal: string) => {
  let tmp = enteredVal.toLowerCase();
  tmp = tmp.replace(/\s/g, "-");
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, "");
  return tmp;
};

export const getSubDomain = () => {
  const sessions = localStorage.getItem("userSession") || "";
  const storedSession = JSON.parse(sessions);
  const site_url = storedSession?.userInfo?.preferred_sites_urls;
  const domain = site_url[getSelectedSite() || 0]?.replace(".com.", ".com");
  if (domain) {
    if (domain.startsWith("http://")) {
      return domain.replace("http://", "https://");
    } else if (!domain.startsWith("https://")) {
      return `https://${domain}`;
    }
    return domain;
  }
  return null; // Return null if `domain` is null or undefined
};

export const updateStructureData = (content: any, banner: any, keywords: any, pageUrl: any) => {
  let articleStructureData = {};
  articleStructureData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: trimString(handleHtmlTags(content?.title), 100),
    Description: trimString(handleHtmlTags(content?.description), 200),
    keywords: keywords,
    image: banner,
    url: `${getSubDomain()}/en/article/${pageUrl}`,
    datePublished: dateFormat(new Date().toISOString()),
    dateModified: dateFormat(new Date().toISOString()),
    author: [
      {
        "@type": "Person",
        name: content.page_createdby,
      },
    ],
  };

  return articleStructureData;
};

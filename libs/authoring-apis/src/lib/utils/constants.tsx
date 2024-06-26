export const ContentTypes = [
  { id: "ALL", value: "ALL" },
  { id: "Images", value: "Image Gallery" },
  { id: "Videos", value: "Video Gallery" },
  { id: "Gallery", value: "Gallery" },
  { id: "Accolades", value: "Accolades" },
  { id: "ServiceCard", value: "Service Card" },
  { id: "Articles", value: "Articles" },
  { id: "VOD", value: "VOD" },
  { id: "Quiz", value: "Quiz" },
  { id: "Poll", value: "Poll" },
];
export const ROW_SIZE = 20;
export const SORT_ORDER = "DESC";
export const ContentGalleryTypes = [
  "ALL",
  "ServiceCard",
  "ImageGallery",
  "VideoGallery",
  "Gallery",
  "Accolades",
  "Article",
  "VOD",
  "Quiz",
  "Poll",
  "Event",
];

export const ContentGalleryTypes1 = [
  "ImageGallery",
  "VideoGallery",
  "Gallery",
  "Article",
  "VOD",
  "Quiz",
  "Poll",
  "Event",
];

export const LanguageList = [
  { id: "en", value: "English (UK)" },
  { id: "fr", value: "French" },
  { id: "de", value: "German" },
];
export const ratios = {
  hero: "3 / 1",
  landscape: "16 / 9",
  card2: "4 / 3",
  square: "1 / 1",
  card1: "2 / 3",
  portrait: "9 / 16",
};
export const breakpoints = [
  {
    breakpoint: 1440,
    ratio: "landscape",
    ratioName: "Landscape",
    aspectRatio: 16 / 9,
    aspectRatioName: "16 / 9",
  },
  {
    breakpoint: 1280,
    ratio: "square",
    ratioName: "Square",
    aspectRatio: 1 / 1,
    aspectRatioName: "1 / 1",
  },
  {
    breakpoint: 1024,
    ratio: "portrait",
    ratioName: "Portrait",
    aspectRatio: 9 / 16,
    aspectRatioName: "9 / 16",
  },
  {
    breakpoint: 768,
    ratio: "hero",
    ratioName: "Hero",
    aspectRatio: 3 / 1,
    aspectRatioName: "3 / 1",
  },
  {
    breakpoint: 600,
    ratio: "card1",
    ratioName: "Card1",
    aspectRatio: 2 / 3,
    aspectRatioName: "2 / 3",
  },
  {
    breakpoint: 320,
    ratio: "card2",
    ratioName: "Card2",
    aspectRatio: 4 / 3,
    aspectRatioName: "4 / 3",
  },
];
export const DefaultLocale = "en";
export const CATEGORY_CONTENT = "content";
export const CATEGORY_PAGE = "Page";
export const SORTED_ORDER = "ASC";
export const MENU_STATE_DRAFT = "DRAFT";
export const MENU_TAGGING = "Navigation";
export const USERNAME_EMAIL_EXIST = "Username already exist!";
export const CONTENT_TYPES = ["article", "quiz", "poll", "event"];
export const SITE_PAGE = "SitePage";

export const ImageCropOrder = {
  1440: "hero",
  1280: "landscape",
  1024: "card2",
  768: "square",
  600: "card1",
  320: "portrait",
};

// export const countries = [
//   { code: 'AD', phone: '376', label: `(AD) +376` },
//   { code: 'BZ', label: `(BZ) +501`, phone: '501' },

export const countries = [
  { code: "AD", label: `(AD) +376`, phone: "376" },

  {
    code: "AE",
    label: `(AE) +971`,
    phone: "971",
  },

  { code: "AF", label: `(AF) +93`, phone: "93" },

  {
    code: "AG",
    label: `(AG) +1-268`,
    phone: "1-268",
  },

  { code: "AL", label: "(AL)  +355", phone: "355" },
  { code: "AM", label: "(AM)  +374", phone: "374" },
  { code: "AO", label: "(AO)  +244", phone: "244" },
  { code: "AQ", label: "(AQ)  +672", phone: "672" },
  { code: "AR", label: "(AR)  +54", phone: "54" },
  { code: "AS", label: "(AS)  +1-684", phone: "1-684" },
  { code: "AT", label: "(AT)  +43", phone: "43" },

  {
    code: "AU",
    label: "(AU) +61",
    phone: "61",
    suggested: true,
  },

  { code: "AW", label: "(AW)  +297", phone: "297" },
  { code: "AX", label: "(AX)  +358", phone: "358" },
  { code: "AZ", label: "(AZ)  +994", phone: "994" },

  {
    code: "BA",
    label: "(BA) +387",
    phone: "387",
  },

  { code: "BB", label: "(BB)  +1-246", phone: "1-246" },
  { code: "BD", label: "(BD)  +880", phone: "880" },
  { code: "BE", label: "(BE)  +32", phone: "32" },
  { code: "BF", label: "(BF)  +226", phone: "226" },
  { code: "BG", label: "(BG)  +359", phone: "359" },
  { code: "BH", label: "(BH)  +973", phone: "973" },
  { code: "BI", label: "(BI)  +257", phone: "257" },
  { code: "BJ", label: "(BJ)  +229", phone: "229" },
  { code: "BL", label: "(BL)  +590", phone: "590" },
  { code: "BM", label: "(BM)  +1-441", phone: "1-441" },
  { code: "BN", label: "(BN)  +673", phone: "673" },
  { code: "BO", label: "(BO)  +591", phone: "591" },
  { code: "BR", label: "(BR)  +55", phone: "55" },
  { code: "BS", label: "(BS)  +1-242", phone: "1-242" },
  { code: "BT", label: "(BT)  +975", phone: "975" },
  { code: "BV", label: "(BV)  +47", phone: "47" },
  { code: "BW", label: "(BW)  +267", phone: "267" },
  { code: "BY", label: "(BY)  +375", phone: "375" },
  { code: "BZ", label: "(BZ)  +501", phone: "501" },
  {
    code: "CA",
    label: "(CA) +1",
    phone: "1",
    suggested: true,
  },

  {
    code: "CC",
    label: "(CC) +61",
    phone: "61",
  },

  {
    code: "CD",
    label: "(CD) +243",
    phone: "243",
  },

  {
    code: "CF",
    label: "(CF) +236",
    phone: "236",
  },

  {
    code: "CG",
    label: "(CG) +242",
    phone: "242",
  },

  { code: "CH", label: "(CH)  +41", phone: "41" },
  { code: "CI", label: "(CI)  +225", phone: "225" },
  { code: "CK", label: "(CK)  +682", phone: "682" },
  { code: "CL", label: "(CL)  +56", phone: "56" },
  { code: "CM", label: "(CM)  +237", phone: "237" },
  { code: "CN", label: "(CN)  +86", phone: "86" },
  { code: "CO", label: "(CO)  +57", phone: "57" },
  { code: "CR", label: "(CR)  +506", phone: "506" },
  { code: "CU", label: "(CU)  +53", phone: "53" },
  { code: "CV", label: "(CV)  +238", phone: "238" },
  { code: "CW", label: "(CW)  +599", phone: "599" },
  { code: "CX", label: "(CX)  +61", phone: "61" },
  { code: "CY", label: "(CY)  +357", phone: "357" },
  { code: "CZ", label: "(CZ)  +420", phone: "420" },

  {
    code: "DE",
    label: "(DE) +49",
    phone: "49",
    suggested: true,
  },

  { code: "DJ", label: "(DJ)  +253", phone: "253" },
  { code: "DK", label: "(DK)  +45", phone: "45" },
  { code: "DM", label: "(DM)  +1-767", phone: "1-767" },

  {
    code: "DO",
    label: "(DO) +1-809",
    phone: "1-809",
  },

  { code: "DZ", label: "(DZ)  +213", phone: "213" },
  { code: "EC", label: "(EC)  +593", phone: "593" },
  { code: "EE", label: "(EE)  +372", phone: "372" },
  { code: "EG", label: "(EG)  +20", phone: "20" },
  { code: "EH", label: "(EH)  +212", phone: "212" },
  { code: "ER", label: "(ER)  +291", phone: "291" },
  { code: "ES", label: "(ES)  +34", phone: "34" },
  { code: "ET", label: "(ET)  +251", phone: "251" },
  { code: "FI", label: "(FI)  +358", phone: "358" },
  { code: "FJ", label: "(FJ)  +679", phone: "679" },

  {
    code: "FK",
    label: "(FK) +500",
    phone: "500",
  },

  {
    code: "FM",
    label: "(FM) +691",
    phone: "691",
  },

  { code: "FO", label: "(FO)  +298", phone: "298" },

  {
    code: "FR",
    label: "(FR) +33",
    phone: "33",
    suggested: true,
  },

  { code: "GA", label: "(GA)  +241", phone: "241" },
  { code: "GB", label: "(GB)  +44", phone: "44" },
  { code: "GD", label: "(GD)  +1-473", phone: "1-473" },
  { code: "GE", label: "(GE)  +995", phone: "995" },
  { code: "GF", label: "(GF)  +594", phone: "594" },
  { code: "GG", label: "(GG)  +44", phone: "44" },
  { code: "GH", label: "(GH)  +233", phone: "233" },
  { code: "GI", label: "(GI)  +350", phone: "350" },
  { code: "GL", label: "(GL)  +299", phone: "299" },
  { code: "GM", label: "(GM)  +220", phone: "220" },
  { code: "GN", label: "(GN)  +224", phone: "224" },
  { code: "GP", label: "(GP)  +590", phone: "590" },
  { code: "GQ", label: "(GQ)  +240", phone: "240" },
  { code: "GR", label: "(GR)  +30", phone: "30" },

  {
    code: "GS",
    label: "(GS) +500",
    phone: "500",
  },

  { code: "GT", label: "(GT)  +502", phone: "502" },
  { code: "GU", label: "(GU)  +1-671", phone: "1-671" },
  { code: "GW", label: "(GW)  +245", phone: "245" },
  { code: "GY", label: "(GY)  +592", phone: "592" },
  { code: "HK", label: "(HK)  +852", phone: "852" },
  {
    code: "HM",
    label: "(HM) +672",
    phone: "672",
  },

  { code: "HN", label: "(HN)  +504", phone: "504" },
  { code: "HR", label: "(HR)  +385", phone: "385" },
  { code: "HT", label: "(HT)  +509", phone: "509" },
  { code: "HU", label: "(HU)  +36", phone: "36" },
  { code: "ID", label: "(ID)  +62", phone: "62" },
  { code: "IE", label: "(IE)  +353", phone: "353" },
  { code: "IL", label: "(IL)  +972", phone: "972" },
  { code: "IM", label: "(IM)  +44", phone: "44" },
  { code: "IN", label: "(IN)  +91", phone: "91" },

  {
    code: "IO",
    label: "(IO) +246",
    phone: "246",
  },

  { code: "IQ", label: "Iraq", phone: "964" },

  {
    code: "IR",
    label: "(IR) +98",
    phone: "98",
  },

  { code: "IS", label: "(IS)  +354", phone: "354" },
  { code: "IT", label: "(IT)  +39", phone: "39" },
  { code: "JE", label: "(JE)  +44", phone: "44" },
  { code: "JM", label: "(JM)  +1-876", phone: "1-876" },
  { code: "JO", label: "(JO)  +962", phone: "962" },

  {
    code: "JP",
    label: "(JP) +81",
    phone: "81",
    suggested: true,
  },

  { code: "KE", label: "(KE)  +254", phone: "254" },
  { code: "KG", label: "(KG)  +996", phone: "996" },
  { code: "KH", label: "(KH)  +855", phone: "855" },
  { code: "KI", label: "(KI)  +686", phone: "686" },
  { code: "KM", label: "(KM)  +269", phone: "269" },

  {
    code: "KN",
    label: "(KN) +1-869",
    phone: "1-869",
  },

  {
    code: "KP",
    label: "(KP) +850",
    phone: "850",
  },

  { code: "KR", label: "(KR)  +82", phone: "82" },

  { code: "KW", label: "(KW)  +965", phone: "965" },
  { code: "KY", label: "(KY)  +1-345", phone: "1-345" },
  { code: "KZ", label: "(KZ)  +7", phone: "7" },
  {
    code: "LA",
    label: "(LA) +856",
    phone: "856",
  },

  { code: "LB", label: "(LB)  +961", phone: "961" },
  { code: "LC", label: "(LC)  +1-758", phone: "1-758" },
  { code: "LI", label: "(LI)  +423", phone: "423" },
  { code: "LK", label: "(LK)  +94", phone: "94" },
  { code: "LR", label: "(LR)  +231", phone: "231" },
  { code: "LS", label: "(LS)  +266", phone: "266" },
  { code: "LT", label: "(LT)  +370", phone: "370" },
  { code: "LU", label: "(LU)  +352", phone: "352" },
  { code: "LV", label: "(LV)  +371", phone: "371" },
  { code: "LY", label: "(LY)  +218", phone: "218" },
  { code: "MA", label: "(MA)  +212", phone: "212" },
  { code: "MC", label: "(MC)  +377", phone: "377" },

  {
    code: "MD",
    label: "(MD) +373",
    phone: "373",
  },

  { code: "ME", label: "(ME)  +382", phone: "382" },

  {
    code: "MF",
    label: "(MF +590)",
    phone: "590",
  },

  { code: "MG", label: "(MG)  +261", phone: "261" },
  { code: "MH", label: "(MH)  +692", phone: "692" },

  {
    code: "MK",
    label: "(MK) +389",
    phone: "389",
  },

  { code: "ML", label: "(ML)  +223", phone: "223" },
  { code: "MM", label: "(MM)  +95", phone: "95" },
  { code: "MN", label: "(MN)  +976", phone: "976" },
  { code: "MO", label: "(MO)  +853", phone: "853" },

  {
    code: "MP",
    label: "(MP) +1-670",
    phone: "1-670",
  },

  { code: "MQ", label: "(MQ)  +596", phone: "596" },
  { code: "MR", label: "(MR)  +222", phone: "222" },
  { code: "MS", label: "(MS)  +1-664", phone: "1-664" },
  { code: "MT", label: "(MT)  +356", phone: "356" },
  { code: "MU", label: "(MU)  +230", phone: "230" },
  { code: "MV", label: "(MV)  +960", phone: "960" },
  { code: "MW", label: "(MW)  +265", phone: "265" },
  { code: "MX", label: "(MX)  +52", phone: "52" },
  { code: "MY", label: "(MY)  +60", phone: "60" },
  { code: "MZ", label: "(MZ)  +258", phone: "258" },
  { code: "NA", label: "(NA)  +264", phone: "264" },
  { code: "NC", label: "(NC)  +687", phone: "687" },
  { code: "NE", label: "(NE)  +227", phone: "227" },
  { code: "NF", label: "(NF)  +672", phone: "672" },
  { code: "NG", label: "(NG)  +234", phone: "234" },
  { code: "NI", label: "(NI)  +505", phone: "505" },
  { code: "NL", label: "(NL)  +31", phone: "31" },
  { code: "NO", label: "(NO)  +47", phone: "47" },
  { code: "NP", label: "(NP)  +977", phone: "977" },
  { code: "NR", label: "(NR)  +674", phone: "674" },
  { code: "NU", label: "(NU)  +683", phone: "683" },
  { code: "NZ", label: "(NZ)  +64", phone: "64" },
  { code: "OM", label: "(OM)  +968", phone: "968" },
  { code: "PA", label: "(PA)  +507", phone: "507" },
  { code: "PE", label: "(PE)  +51", phone: "51" },
  { code: "PF", label: "(PF)  +689", phone: "689" },
  { code: "PG", label: "(PG)  +675", phone: "675" },
  { code: "PH", label: "(PH)  +63", phone: "63" },
  { code: "PK", label: "(PK)  +92", phone: "92" },
  { code: "PL", label: "(PL)  +48", phone: "48" },

  {
    code: "PM",
    label: "(PM) +508",
    phone: "508",
  },

  { code: "PN", label: "(PN)  +870", phone: "870" },
  { code: "PR", label: "(PR)  +1", phone: "1" },

  {
    code: "PS",
    label: "(PS) +970",
    phone: "970",
  },

  { code: "PT", label: "(PT)  +351", phone: "351" },
  { code: "PW", label: "(PW)  +680", phone: "680" },
  { code: "PY", label: "(PY)  +595", phone: "595" },
  { code: "QA", label: "(QA)  +974", phone: "974" },
  { code: "RE", label: "(RE)  +262", phone: "262" },
  { code: "RO", label: "(RO)  +40", phone: "40" },
  { code: "RS", label: "(RS)  +381", phone: "381" },
  { code: "RU", label: "(RU)  +7", phone: "7" },
  { code: "RW", label: "(RW)  +250", phone: "250" },
  { code: "SA", label: "(SA)  +966", phone: "966" },
  { code: "SB", label: "(SB)  +677", phone: "677" },
  { code: "SC", label: "(SC)  +248", phone: "248" },
  { code: "SD", label: "(SD)  +249", phone: "249" },
  { code: "SE", label: "(SE)  +46", phone: "46" },
  { code: "SG", label: "(SG)  +65", phone: "65" },
  { code: "SH", label: "(SH)  +290", phone: "290" },
  { code: "SI", label: "(SI)  +386", phone: "386" },

  {
    code: "SJ",
    label: "(SJ) +47",
    phone: "47",
  },

  { code: "SK", label: "(SK)  +421", phone: "421" },
  { code: "SL", label: "(SL)  +232", phone: "232" },
  { code: "SM", label: "(SM)  +378", phone: "378" },
  { code: "SN", label: "(SN)  +221", phone: "221" },
  { code: "SO", label: "(SO)  +252", phone: "252" },
  { code: "SR", label: "(SR)  +597", phone: "597" },
  { code: "SS", label: "(SS)  +211", phone: "211" },
  {
    code: "ST",
    label: "(ST) +239",
    phone: "239",
  },

  { code: "SV", label: "(SV)  +503", phone: "503" },

  {
    code: "SX",
    label: "(SX) +1-721",
    phone: "1-721",
  },

  {
    code: "SY",
    label: "(SY) +963",
    phone: "963",
  },

  { code: "SZ", label: "(SZ)  +268", phone: "268" },

  {
    code: "TC",
    label: "(TC) +1-649",
    phone: "1-649",
  },

  { code: "TD", label: "(TD)  +235", phone: "235" },

  {
    code: "TF",
    label: "(TF) +262",
    phone: "262",
  },

  { code: "TG", label: "(TG)  +228", phone: "228" },
  { code: "TH", label: "(TH)  +66", phone: "66" },
  { code: "TJ", label: "(TJ)  +992", phone: "992" },
  { code: "TK", label: "(TK)  +690", phone: "690" },
  { code: "TL", label: "(TL)  +670", phone: "670" },
  { code: "TM", label: "(TM)  +993", phone: "993" },
  { code: "TN", label: "(TN)  +216", phone: "216" },
  { code: "TO", label: "(TO)  +676", phone: "676" },
  { code: "TR", label: "(TR)  +90", phone: "90" },

  {
    code: "TT",
    label: "(TT) +1-868",
    phone: "1-868",
  },

  { code: "TV", label: "(TV)  +688", phone: "688" },

  {
    code: "TW",
    label: "(TW) +886",
    phone: "886",
  },

  {
    code: "TZ",
    label: "(TZ) +255",
    phone: "255",
  },

  { code: "UA", label: "(UA)  +380", phone: "380" },
  { code: "UG", label: "(UG)  +256", phone: "256" },

  {
    code: "US",
    label: "(US) +1",
    phone: "1",
    suggested: true,
  },

  { code: "UY", label: "(UY)  +598", phone: "598" },
  { code: "UZ", label: "(UZ)  +998", phone: "998" },

  {
    code: "VA",
    label: "(VA) +379",
    phone: "379",
  },

  {
    code: "VC",
    label: "(VC) +1-784",
    phone: "1-784",
  },

  { code: "VE", label: "(VE)  +58", phone: "58" },

  {
    code: "VG",
    label: "(VG) +1-284",
    phone: "1-284",
  },

  {
    code: "VI",
    label: "(VI) +1-340",
    phone: "1-340",
  },

  { code: "VN", label: "(VN)  +84", phone: "84" },
  { code: "VU", label: "(VU)  +678", phone: "678" },
  { code: "WF", label: "(WF)  +681", phone: "681" },
  { code: "WS", label: "(WS)  +685", phone: "685" },
  { code: "XK", label: "(XK)  +383", phone: "383" },
  { code: "YE", label: "(YE)  +967", phone: "967" },
  { code: "YT", label: "(YT)  +262", phone: "262" },
  { code: "ZA", label: "(ZA)  +27", phone: "27" },
  { code: "ZM", label: "(ZM)  +260", phone: "260" },
  { code: "ZW", label: "(ZW)  +263", phone: "263" },
];
export const SNOWPLOW = {
  NA: "NA",
  SNOWPLOW: "snowplow",
  TRACKID: "selfDescribingEvent",
  IMPRESSIONTYPE: "user register Impression",
  REGISTERFROM: "Rendering",
  COLLECTOR_URL: "collector.hcl-x.com",
  APP_ID: "x",
  APP_NAME: "plateform-x-authoring-app",
};

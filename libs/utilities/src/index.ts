const InterRegular = require('./lib/fonts/Inter/Inter-Regular.woff2') as string
import AddImage from './lib/components/AddImage/AddImage'
import AutoCompleteMultiSelect from './lib/components/AutoCompleteMultiSelect/AutoCompleteMultiSelect'
import AutoTextArea from './lib/components/AutoTextArea/AutoTextArea'
import { CommonBoxWithNumber } from './lib/components/CommonBoxWithNumber/CommonBoxWithNumber'
import ContentGridLoader from './lib/components/ContentGridLoader'
import DatePicker from './lib/components/DatePicker/DatePicker'
import Error from './lib/components/Error/Error'
import { ErrorTooltip } from './lib/components/ErrorTooltip/ErrorTooltip'
import Gallery from './lib/components/Gallery/Gallery'
import { MiniHeader } from './lib/components/Header/MiniHeader'
import LanguageDropDown from './lib/components/LanguageDropDown/LanguageDropDown'
import { Loader } from './lib/components/Loader'
import ContentListLoader from './lib/components/Loader/ContentListLoader'
import { NoContentFound } from './lib/components/NoContentFound/NoContentFound'
import NoSearchResult from './lib/components/NoSearchResult/NoSearchResult'
import {
  default as DeletePopup,
  default as PlateformXDialog,
} from './lib/components/Popups/PlateformXDialog'
import PlateformXDialogSuccess from './lib/components/Popups/SuccessPopup'
import RadioControlLabel from './lib/components/RadioControlLabel'
import { RadioLabelWithSubheading } from './lib/components/RadioLabelWithSubheading'
import SkeltonLoader from './lib/components/Skeleton-loader/skeleton'
import BasicSwitch from './lib/components/Switch/Switch'
import TaskNotFound from './lib/components/TaskNotFound/TaskNotFound'
import TextBox from './lib/components/TextBox/TextBox'
import TitleSubTitle from './lib/components/TitleSubTitle'
import {
  ShowToastError,
  ShowToastSuccess,
} from './lib/components/ToastNotification/ToastNotification'
import XDialog from './lib/components/XDialog/XDialog'
import XLoader from './lib/components/XLoader/XLoader'
import ArticleListDesktopLoader from './lib/components/contentListLoaderDesktop'
import {
  AUTH_INFO,
  AUTH_URL,
  LOGOUT_URL,
  NEW_LOGOUT_URL,
  REDIRECT_AUTH_URL,
} from './lib/constants/AuthConstant'
import { USERNAME_EMAIL_EXIST } from './lib/constants/CommonConstants'
import useAccess from './lib/hooks/useAccess/useAccess'
import usePlatformAnalytics from './lib/hooks/usePlatformAnalytics/usePlatformAnalytics'
import { usePrelemImpression } from './lib/hooks/usePrelemImpression/usePrelemImpression'
import useUserSession from './lib/hooks/useUserSession/useUserSession'
import { ArticleMapper } from './lib/mappers/articleMapper'
import LightTheme from './lib/themes/authoring/lightTheme'
import ThemeConstants from './lib/themes/authoring/variable'
import PrelemTheme from './lib/themes/prelems/prelemTheme'
import PrelemsThemeConstants from './lib/themes/prelems/prelemVariableDark'
import { getUniqueTimeZone } from './lib/utils/helperFns'
import i18next from './lib/utils/i18next'



// import AutoCompleteMultiSelect from './lib/components/AutoCompleteMultiSelect/AutoCompleteMultiSelect';
// import AutoTextArea from './lib/components/AutoTextArea/AutoTextArea';
// import DatePicker from './lib/components/DatePicker/DatePicker';
// import Error from './lib/components/Error/Error';
// import { ErrorTooltip } from './lib/components/ErrorTooltip/ErrorTooltip';
// import CommonImageRender from './lib/components/Gallery/CommonImageRender';
// import { MiniHeader } from './lib/components/Header/MiniHeader';
// import LanguageDropDown from './lib/components/LanguageDropDown/LanguageDropDown';
// import ContentListLoader from './lib/components/Loader/ContentListLoader';
// import NoSearchResult from './lib/components/NoSearchResult/NoSearchResult';
// import TaskNotFound from './lib/components/TaskNotFound/TaskNotFound';
// import TextBox from './lib/components/TextBox/TextBox';
// import XLoader from './lib/components/XLoader/XLoader';
// import ArticleListDesktopLoader from './lib/components/contentListLoaderDesktop';

export * from './lib/assets/images'
export * from './lib/assets/svg'
export * from './lib/components'
export * from './lib/components/CardSkeleton/CardSkeleton'
export * from './lib/components/ToastNotification/ToastNotification'
export * from './lib/constants/AuthConstant'
export * from './lib/constants/CommonConstants'
export * from './lib/hooks/useAccess/useMapPermissions'
export * from './lib/layouts/TwoColumns/TwoColumnLayout'
export * from './lib/mappers/articleMapper'
export * from './lib/themes/authoring/lightTheme'
export * from './lib/themes/prelems/prelemTheme'
export * from './lib/utils/helper'
export * from './lib/utils/helperConstants'
export * from './lib/utils/helperFns'

export {
  AUTH_INFO,
  AUTH_URL,
  AddImage,
  ArticleListDesktopLoader,
  ArticleMapper,
  AutoCompleteMultiSelect,
  AutoTextArea,
  BasicSwitch,
  CommonBoxWithNumber,
  CommonImageRender,
  ContentGridLoader,
  ContentListLoader,
  DatePicker,
  DeletePopup,
  Error,
  ErrorTooltip,
  Gallery,
  InterRegular,
  LOGOUT_URL,
  LanguageDropDown,
  LightTheme,
  Loader,
  MiniHeader,
  NEW_LOGOUT_URL,
  NoContentFound,
  NoSearchResult,
  PlateformXDialog,
  PlateformXDialogSuccess,
  PrelemTheme,
  PrelemsThemeConstants,
  REDIRECT_AUTH_URL,
  RadioControlLabel,
  RadioLabelWithSubheading,
  ShowToastError,
  ShowToastSuccess,
  SkeltonLoader,
  TaskNotFound,
  TextBox,
  ThemeConstants,
  TitleSubTitle,
  USERNAME_EMAIL_EXIST,
  XDialog,
  XLoader,
  getUniqueTimeZone,
  i18next,
  useAccess,
  usePlatformAnalytics,
  usePrelemImpression,
  useUserSession,
}

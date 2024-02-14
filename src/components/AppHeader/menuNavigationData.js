import { ReactComponent as HelpIcon } from "assets/svg/all/new-icons/dropdown-menu/help-icon.svg";

import { ReactComponent as KnowledgeSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/my-sessions-icon.svg";
import { ReactComponent as ManageSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/manage-sessions.svg";

import { ReactComponent as LogoutIcon } from "assets/svg/all/new-icons/dropdown-menu/logout-icon.svg";
import { ReactComponent as ProfileIcon } from "assets/svg/all/new-icons/dropdown-menu/profile-icon.svg";

import { ReactComponent as SettingsIcon } from "assets/svg/all/new-icons/dropdown-menu/settings-icon.svg";

import { ReactComponent as ReferIcon } from "assets/svg/all/new-icons/dropdown-menu/refer-icon.svg";

const menuNavigationData = [
  {
    url: "/u/account/edit-profile/1",
    icon: ProfileIcon,
    title: "Profile",
    description: "Modify your public profile",
  },

  {
    url: "/u/account/referral",
    icon: ReferIcon,
    title: "Refer",
    description: "Refer hivepath platform to your network",
  },

  {
    url: "/settings",
    icon: SettingsIcon,
    title: "Account Settings",
    description: "Change your account and preferences",
  },

  {
    url: "/u/account/sessions",
    icon: KnowledgeSessionIcon,
    title: "My Sessions",
    description: "Change your account and preferences",
  },

  {
    url: "/u/account/manage-sessions",
    icon: ManageSessionIcon,
    title: "Manage Sessions",
    description: "Change your account and preferences",
  },

  {
    url: "/help",
    icon: HelpIcon,
    title: "Help",
    description: "Change your account and preferences",
  },
];

export default menuNavigationData;

export const getHeaderNavigation = (navigation) =>
  navigation.filter((item) => item.visible?.header);

export const getFooterNavigation = (navigation) =>
  navigation.filter((item) => item.visible?.footer);

export const getMobileNavigation = (navigation) =>
  navigation.filter((item) => item.visible?.mobile);

import useSWR, { useSWRConfig } from 'swr';

export const useToggleDrawer = (initialData?: boolean) => {
  // const {data, mutate } = useSWR('side-drawer', null);
  //   // const { mutate } = useSWRConfig();
  // if () {

  // 	}
  console.log('init:', initialData);
  if (initialData != undefined) {
    return useSWR('side-drawer', null, { fallbackData: initialData });
  } else {
    return useSWR('side-drawer', null);
  }
};

import { StaffTemplate } from 'components/templates/staffs/staff-template';
import { ScreenName } from 'constants/screen-name';
import { TitleSuffix } from 'constants/title-suffix';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { resetServerContext } from 'react-beautiful-dnd';
import { useVerifyAuthenticated } from 'stores/use-current-user';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { Main } from 'components/molecules/main';

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

// const StaffPage = (props: Props) => {
const StaffPage = () => {
  useVerifyAuthenticated();

  return (
    <>
      <Head>
        {/* <title>{props.pageTitle}</title> */}
        <title>{ScreenName.Staff + TitleSuffix}</title>
      </Head>
      {/* <StaffListContextProvider filterWithActiveStaff={false}> */}
      <Main>
        <StaffTemplate />
      </Main>
      {/* </StaffListContextProvider> */}
    </>
  );
};

// type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

// const StaffPage = (props: Props) => {
//   useVerifyAuthenticated();

//   return (
//     <>
//       <Head>
//         <title>{ScreenName.Staff + TitleSuffix}</title>
//       </Head>
//       <StaffListContextProvider filterWithActiveStaff={false}>
//         <StaffTemplate />
//       </StaffListContextProvider>
//     </>
//   );
// };

export default StaffPage;

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   resetServerContext();
//   return {
//     props: {
//       pageTitle: ScreenName.Staff + TitleSuffix,
//     },
//   };
// };

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   return {
//     props: {
//       pageTitle: ScreenName.Staff + TitleSuffix,
//     },
//   };
// };

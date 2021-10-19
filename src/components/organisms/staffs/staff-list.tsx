import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';
import { ErrorAlert } from 'components/atoms/error-alert';

export const StaffList = () => {
  const { error, data } = useFetchStaffList();
  // const { removeTodo } = useRemoveTodo();
  // if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (!data) return <p>Now Loading</p>;
  if (data.length === 0) return <p>担当者を追加してください</p>;
  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created at</th>
          <th>Updated at</th>
          <th>Delete</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { InputDialog } from 'components/molecules/dialogs/input-dialog';
import { NoteTextField } from 'components/molecules/text-fields/note-text-field';
import { useUpsertOrderNoteForm } from 'hooks/orders/use-update-order-note-form';

type Props = {
  id: string;
  note?: string | null;
};

export const UpdateOrderNoteButton = ({ id, note }: Props) => {
  const { useFormReturn, on, toggle, isLoading, error, submitHandler, cancelHandler } = useUpsertOrderNoteForm(
    id,
    note,
  );
  const startIcon = <Edit />;
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={startIcon}>
        {'備考'}
      </Button>
      <InputDialog
        dialogTitle={''}
        submitButtonLabel={'編集する'}
        startIcon={startIcon}
        on={on}
        formId='order-note-form'
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        fullWidth={true}
      >
        <NoteTextField {...useFormReturn} disabled={isLoading} />
      </InputDialog>
    </>
  );
};

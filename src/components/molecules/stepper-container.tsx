import { Box, Step, StepButton, Stepper } from '@mui/material';
import { CenteringBodyContainer } from 'components/atoms/centering-body-container';

type Props = {
  steps: string[];
  activeStep: number;
};

export const StepperContainer: React.FC<Props> = ({ steps, activeStep, children }) => {
  return (
    <CenteringBodyContainer>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepButton color='inherit'>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Box mt={8}>{children}</Box>
    </CenteringBodyContainer>
  );
};

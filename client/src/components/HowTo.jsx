import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'

const steps = [
    {
        label: 'Register',
        description: `Each student should register to the system before the are going try to get any service.Because there is no tutoring service without registration.`,
    },
    {
        label: 'Search Tutor',
        description:
            'Search tutor filter your preferd tutor with the available tools on the system.',
    },
    {
        label: 'Schedule tutorial',
        description: `Schedule your tutorial by slecting the starting and ending time of the tutorial. Once you finish this process wait until the tutor accepts your request.If the tutor accepts the schedule go to the next step.`,
    },
    {
        label: 'Make payment',
        description: `After acceptance of the schedule go to payment button and pay based on the hourly rate of the tutor.`,
    },
];

const Wrapper = styled.div`
margin:60px 0;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Title = styled.h3`
font-size:30px;
text-align:center;
padding-bottom:40px;
`
const signin = styled.div`
font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`
const image = styled.div`
`
export default function HowTo() {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Wrapper>
            <Title>How To For Student</Title>
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel sx={{fontSize:"40px",fontWeight:"w800"}}
                                optional={
                                    index === 3 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography sx={{fontSize:"25px"}}>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </Wrapper>
    )
}

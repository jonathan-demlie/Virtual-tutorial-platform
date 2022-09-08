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
        description: `Tutors should register to the system before the are going try to give any service.`,
    },
    {
        label: 'Profile',
        description: `Fill the necessary informations about your self. Your price per hour,Education, Field of study and other neccessary informations.`,
    },
    {
        label: 'Verify Account',
        description:
            'Verify your account so as to get schedules from tutors.',
    },
    {
        label: 'Accept Schedules',
        description: `Accept schedules from the students and start tutoring.`,
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

export default function HowToTutor() {
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
            <Title>How To For Tutor</Title>
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel sx={{ fontSize: "40px", fontWeight: "w800" }}
                                optional={
                                    index === 3 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography sx={{ fontSize: "25px" }}>{step.description}</Typography>
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

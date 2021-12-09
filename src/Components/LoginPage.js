import { Form, Formik, Field } from "formik"
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/User/UserActions";
import { login } from "../api/Endpoints";

const LoginPage = () => {

    const dispatch = useDispatch()
    // const history = useHistory();

    const postLogin = (loginData, helper) => {
        login(loginData)
            .then(({ data: userResponseDto, headers: { authorization } }) => {
                dispatch(
                    setLogin({
                        loggedInUser: userResponseDto,
                        jwt: authorization
                    })
                )

                // history.push("/")
            })
            .finally(() => helper.setSubmitting(false))
    }

    return (
        <>
            <Formik initialValues={{
                username: '',
                password: '',
            }}
                onSubmit={postLogin}
            >
                {props =>
                    <Container maxWidth="sm">
                        <Paper elevation={10}>
                            <Box p={3}>
                                <Grid align="center" container justifyContent="center" alignItems="center">
                                    <h1>Login</h1>
                                </Grid>
                                <Form onSubmit={props.handleSubmit}>
                                    <div>
                                        <FormControl fullWidth variant="outlined" margin="dense">
                                            <InputLabel htmlFor="username">Your user name</InputLabel>
                                            <Field id="username"
                                                name="username"
                                                label="Your user name"
                                                as={OutlinedInput} />
                                        </FormControl>

                                        <FormControl fullWidth variant="outlined" margin="dense">
                                            <InputLabel htmlFor="password">Your password</InputLabel>
                                            <Field id="password"
                                                name="password"
                                                label="Your password"
                                                type="password"
                                                as={OutlinedInput} />
                                        </FormControl>
                                    </div>

                                    <Box p={3}>
                                        <Grid align="center" container justifyContent="center" alignItems="center">
                                            <Grid item>
                                                {props.isSubmitting ?
                                                    <span>Submiting...</span> :
                                                    <Button color="primary"
                                                        variant="contained"
                                                        type="submit">
                                                        Log in
                                                    </Button>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Form>
                            </Box>
                        </Paper>
                    </Container>
                }
            </Formik>
        </>
    )
}

export default LoginPage

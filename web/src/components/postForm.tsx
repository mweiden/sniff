import React from "react";
import { useCreateNewPostMutation } from "../rpc/operations/CreateNewPost.generated";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { styled } from "styled-components";

const FormRow = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-style: italic;
`;

const SytledField = styled(Field)`
    font-family: 'Courier New', monospace;
    font-size: 1em;
`;

const StyledButton = styled.button`
    float: right;
    margin-top: 10px;
`;

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  body: Yup.string()
    .required("Body is required")
});

type PostFormProps = {
    onSubmit: () => void;
}

type FormData = {
    title: string;
    body: string;
}

const PostForm = ({ onSubmit }: PostFormProps) => {
    const initialValues: FormData = { title: "", body: "" };
    const [createNewPostMutation, ] = useCreateNewPostMutation();

    function handleSubmit(values: {title: string, body: string}, { resetForm }: FormikHelpers<FormData>) {
        resetForm({ values: initialValues });
        createNewPostMutation({variables: values});
        onSubmit();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={PostSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                const {
                    errors,
                    touched,
                    isValid,
                    dirty,
                } = formik;
                return (
                    <div>
                        <Form>
                            <FormRow style={{ marginBottom: "5px" }}>
                                <label htmlFor="title"><b>Title</b></label>
                                <SytledField
                                    type="title"
                                    name="title"
                                    id="title"
                                    cols="60"
                                    className={errors.title && touched.title ? "input-error" : undefined}
                                />
                                <StyledErrorMessage name="title" component="span" className="error"/>
                            </FormRow>
                            <FormRow>
                                <label htmlFor="body"><b>Body</b></label>
                                <SytledField
                                    type="body"
                                    name="body"
                                    id="body"
                                    component="textarea"
                                    style={{ resize: 'none' }}
                                    rows="6"
                                    cols="60"
                                    className={errors.body && touched.body ? "input-error" : undefined}
                                />
                                <StyledErrorMessage name="body" component="span" className="error"/>
                            </FormRow>
                            <StyledButton
                                type="submit"
                                className={!(dirty && isValid) ? "disabled-button": ""}
                                disabled={!(dirty && isValid)}
                            >
                                Submit!
                            </StyledButton>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default PostForm;
import { useFormik } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import { useDebouncedCallback } from 'use-debounce'

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, "Please add atleast 3 characters")
        .required("Name is required"),
    phone: yup
        .string()
        .min(9, "Please add atleast 3 characters")
        .max(11)
        .required("Phone is required"),
    company:  yup
        .string()
        .min(3, "Please add atleast 3 characters")
        .max(100)
        .required("Company is required"),
    address:  yup
        .string()
        .min(3, "Please add atleast 3 characters")
        .max(100)
        .required("Address is required"),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Your password is too short.'),
    rpassword: yup
        .string()
        .required('Please retype your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    email: yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required')
});

export const SignUpForm = ({formSwitcher}) => {
    
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = async (values) => {
        //const { ...data } = values;
        const form = values;
        //console.log(form);

        const response = await axios
        .post("http://ticket.salmanaziz.tech/api/v1/signup.php", form
        )
        .catch((err) => {
            if (err && err.response) setError(err.response.data.message);
            setSuccess(null);
        });

        if (response && response.data) {
            setError(null);
            setSuccess(<Alert variant={response.data.status === 'error' ? 'danger' : 'success'}>{response.data.message}</Alert>);
            
        //formik.resetForm();
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            company: "",
            address: "",
            password: "",
            rpassword: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });

    const updateValFromStore = useDebouncedCallback((key, val) => {
        console.log({ key, val });
    }, 300);

    //console.log("Error", error);
    

    return (
        <>
        <Container className="signUpDiv" >
            <Row>
                <Col>
                <h1 className="text-info text-center">User Registration</h1>
                <hr />
                    
                    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Form.Group>
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('name', formik.values.name)
                            }}
                            //onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter full name"
                        />
                        </Form.Group>
                        {formik.errors.name && formik.touched.name ?
                        <Alert variant="danger">{formik.errors.name}</Alert>
                        : ""}
                        <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formik.values.phone}
                            //onChange={formik.handleChange}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('phone', formik.values.phone)
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Enter phone"
                        />
                        </Form.Group>
                        {formik.errors.phone && formik.touched.phone ?
                        <Alert variant="danger">{formik.errors.phone}</Alert>
                        : ""}
                        <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formik.values.email}
                            //onChange={formik.handleChange}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('email', formik.values.email)
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Enter email"
                        />
                        </Form.Group>
                        {formik.errors.email && formik.touched.email ?
                        <Alert variant="danger">{formik.errors.email}</Alert>
                        : ""}
                        <Form.Group>
                        <Form.Label>Company name</Form.Label>
                        <Form.Control
                            type="text"
                            name="company"
                            value={formik.values.company}
                            //onChange={formik.handleChange}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('company', formik.values.company)
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Enter company name"
                        />
                        </Form.Group>
                        {formik.touched.company && formik.errors.company ?
                        <Alert variant="danger">{formik.errors.company}</Alert>
                        : ""}
                        <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formik.values.address}
                            //onChange={formik.handleChange}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('address', formik.values.address)
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Full Address"
                        />
                        </Form.Group>
                        {formik.touched.address && formik.errors.address ?
                        <Alert variant="danger">{formik.errors.address}</Alert>
                        : ""}
                        <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formik.values.password}
                            //onChange={formik.handleChange}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('password', formik.values.password)
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Enter password"
                        />
                        </Form.Group>
                        {formik.touched.password && formik.errors.password ?
                        <Alert variant="danger">{formik.errors.password}</Alert>
                        : ""}
                        <Form.Group>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            name="rpassword"
                            value={formik.values.rpassword}
                            //onChange={formik.handleChange}
                            onChange={(event) => {
                                formik.handleChange(event)
                                updateValFromStore('rpassword', formik.values.rpassword)
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Enter confirm password"
                        />
                        </Form.Group>
                        {formik.touched.rpassword && formik.errors.rpassword ?
                        <Alert variant="danger">{formik.errors.rpassword}</Alert>
                        : ""}
                        
                        {!error && <div>{success ? success : ""}</div>}
                        {!success && <div>{error ? error : ""}</div>}
                        <Button type="submit" disabled={!formik.isValid}>Sign Up</Button>
                    </Form>
                    
                <hr />
                </Col>
            </Row>

            <Row>
                <Col>
                Already a member? <a href="#!" onClick={() => formSwitcher("login")}>
                    Login Now
                </a>
                </Col>
            </Row>
        </Container> 
        </>
    );
}

SignUpForm.propTypes = {
    formSwitcher: PropTypes.func.isRequired,
};  

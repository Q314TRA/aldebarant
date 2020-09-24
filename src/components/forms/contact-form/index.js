import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Row, Col } from '../../ui/wrapper'
import useFormUrl from '../useFormUrl'
import Form, { FormGroup, Input, Textarea, Error } from '../../ui/form'
import Button from '../../ui/button'

const ContactForm = () => {
    const formUrl = useFormUrl();
    const { register, handleSubmit, errors, reset } = useForm({
        mode: "onBlur"
    })

    const [serverState, setServerState] = useState({
        submitting: false,
        status: null
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg }
        });
        if (ok) {
            form.reset();
        }
    };

    const onSubmit = (data, e) => {
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: "post",
            url: formUrl,
            data: data
        })
            .then(r => {
                handleServerResponse(true, "Gracias! Por contactarse con nostros.", form);
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row gutters={{ lg: 20 }}>
                <Col lg={6}>
                    <FormGroup mb="20px">
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nombre *"
                            ref={register({ required: 'Nombre es requerido' })}
                        />
                        <Error>{errors.name && errors.name.message}</Error>
                    </FormGroup>
                </Col>
                <Col lg={6}>
                    <FormGroup mb="20px">
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email *"
                            ref={register({
                                required: 'Email es requerido',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                        <Error>{errors.email && errors.email.message}</Error>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <FormGroup mb="20px">
                        <Input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Asunto *"
                            ref={register({ required: 'Asunto es requerido' })}
                        />
                        <Error>{errors.subject && errors.subject.message}</Error>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <FormGroup mb="30px">
                        <Textarea
                            name="message"
                            id="message"
                            placeholder="Cuentanos tu necesidad."
                            ref={register({
                                required: 'Mensaje es requerido',
                                maxLength: {
                                    value: 200,
                                    message: "Maximo 200 caracteres."
                                },
                                minLength: {
                                    value: 10,
                                    message: "Minimo 10 caracteres."
                                }
                            })}
                        ></Textarea>
                        <Error>{errors.message && errors.message.message}</Error>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Button type="submit" disabled={serverState.submitting}>Enviar</Button>
                    {serverState.status && (
                        <p className={`form-output ${!serverState.status.ok ? "errorMsg" : "success"}`}>
                            {serverState.status.msg}
                        </p>
                    )}
                </Col>
            </Row>
        </Form>
    )
}

export default ContactForm;
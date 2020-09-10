import React, { useContext, useState, useEffect } from 'react';
import FormInput from '../form/form-input.component';
import { FormContainer, SubmitButton, JumboContainer } from '../form/form.styles';
import { Formik, Form } from 'formik';
import { TaskContext } from "../../contexts/TaskContext";
import axios from 'axios';
import * as yup from 'yup';

const CreateItem = ({ id, onHide }) => {
    const { addItem, editItem } = useContext(TaskContext);
    const isAddMode = id === 'new';

    const [item, setItem] = useState({
        title: '',
        description: '',
        priority: '',
        status: ''
    });

    useEffect(() => {
        if(!isAddMode){
        const getItems = async () => {
        const res = await axios.get(`/api/item/${id}`)
            setItem(res.data)
        }
        getItems()
    }
    }, [])

    const schema = yup.object({
        title: yup.string().required().max(50),
        description: yup.string().required().max(200),
      });

    function SubmitForm(fields, { setStatus }) {
        setStatus();
        if (isAddMode) {
            createItem(fields);
        } else {
            updateItem(id, fields);
        }
        onHide()
    }

    function createItem(fields) {
        addItem(fields)
    }

    function updateItem(id, fields) {
        editItem(id, fields)
    }

  return (
    <JumboContainer>
        <FormContainer>
            <Formik
                validationSchema={schema}
                enableReinitialize={true}
                onSubmit={SubmitForm}
                initialValues={item}
            >
                {({
                handleChange,
                handleBlur,
                touched,
                values,
                errors, 
                }) => {
                return (
                <Form>
                <FormInput
                    name='title'
                    type='text'
                    label='Title'
                    id='title'
                    error={touched.title && errors.title}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FormInput
                    name='description'
                    type='text'
                    label='Description'
                    id='description'
                    error={touched.description && errors.description}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> 
                <FormInput
                    name='priority'
                    type='number'
                    label='Priority'
                    id='priority'
                    error={touched.priority && errors.priority}
                    value={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as='select'
                    >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </FormInput>
                <FormInput
                    name='status'
                    type='number'
                    label='Status'
                    id='status'
                    error={touched.status && errors.status}
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as='select'
                >
                    <option value="start">Start</option>
                    <option value="progress">In Progress</option>
                    <option value="done">Done</option> 
                </FormInput>
                <SubmitButton type="submit" className="btn btn-primary">Submit</SubmitButton>
                </Form>
                )}}
        </Formik>
    </FormContainer>
  </JumboContainer>
    );
}

  
export default CreateItem;
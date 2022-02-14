import { Field, Formik } from 'formik';
import React from 'react';
import { FormikInput } from '../../components/FormikComponents';
import ProfileLayout from '../../components/layout/ProfileLayout';
import * as Yup from 'yup';

function EditInformation() {
  const formikRef = React.useRef(null);

  function focusChange(e) {
    if (e.target.value.length >= e.target.getAttribute('maxlength')) {
      e.target.parentElement.nextElementSibling.firstChild.focus();
    }
  }

  const Schema = Yup.object().shape({
    firstName: Yup.string()
      .required('This field is required!')
      .typeError('This field should be string!')
      .min(2, 'First name should have at least 2 character!')
      .max(12, 'First name should have maximum 12 character!'),

    lastName: Yup.string()
      .required('This field is required!')
      .typeError('This field should be string!')
      .min(2, 'Last name should have at least 2 character!')
      .max(20, 'First name should have maximum 20 character!'),

    day: Yup.number()
      .required('This field is required!')
      .positive('Day Should be 1 to 12!')
      .integer()
      .typeError('Day should be in number!')
      .max(13, 'Day should be 1 to 12!'),
    month: Yup.number()
      .required('This field is required!')
      .positive('Month Should be Positive Number!')
      .integer()
      .typeError('Month should be in number!')
      .max(34, 'Month should be less than 34!'),
    year: Yup.number()
      .required('This field is required!')
      .positive('Year Should be Positive Number!')
      .integer()
      .typeError('Year should be in number!')
      .min(new Date().getFullYear() - 120, 'Invalid birth Year!')
      .max(new Date().getFullYear() - 5, 'Invalid birth Year!'),
    address: Yup.string().required('This field is required!'),
  });

  return (
    <ProfileLayout showSearch={true} showSymbol={true}>
      <main className="xl:container mt-3 mx-1 md:mx-3 xl:mx-auto px-2">
        <div className="p-3 shadow bg-white dark:bg-gray-900 rounded-md">
          <h1 className="text-xl">Personal Detail</h1>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              birthDate: '',
              address: '',
              avtar: '',
              day: '',
              month: '',
              year: '',
            }}
            validationSchema={Schema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                // handleSubmission(values);
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ errors, handleSubmit, isSubmitting, touched }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {/* <CustomSelectField /> */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-5 py-2">
                    <div className="mb-2">
                      <label htmlFor="firstName" className="text-sm text-gray-800 dark:text-white select-none">
                        First Name
                      </label>
                      <Field id="firstName" name="firstName" component={FormikInput} placeholder="First Name" />
                      {touched.firstName && errors.firstName && (
                        <p className="error" style={{ color: 'red' }}>
                          {errors.firstName}{' '}
                        </p>
                      )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="lastName" className="text-sm text-gray-800 dark:text-white select-none">
                        Last Name
                      </label>
                      <Field id="lastName" name="lastName" component={FormikInput} placeholder="Last Name" />
                      {touched.lastName && errors.lastName && (
                        <p className="error" style={{ color: 'red' }}>
                          {errors.lastName}{' '}
                        </p>
                      )}
                    </div>
                    <div>
                      <h1 className="select-none text-sm">Date of Birth (AD)</h1>
                      <div className="flex gap-3">
                        <div className="mb-2">
                          <Field
                            id="day"
                            name="day"
                            component={FormikInput}
                            maxLength="2"
                            onInput={(e) => focusChange(e)}
                            placeholder="Eg. 1"
                          />
                          <label htmlFor="day" className="text-xs text-gray-800 dark:text-white select-none">
                            DD
                          </label>

                          {touched.day && errors.day && (
                            <p className="error" style={{ color: 'red' }}>
                              {errors.day}{' '}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <Field
                            id="month"
                            name="month"
                            component={FormikInput}
                            maxLength="2"
                            onInput={(e) => focusChange(e)}
                            placeholder="Eg. 6"
                          />
                          <label htmlFor="month" className="text-xs text-gray-800 dark:text-white select-none">
                            MM
                          </label>
                          {touched.month && errors.month && (
                            <p className="error" style={{ color: 'red' }}>
                              {errors.month}{' '}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <Field id="year" name="year" component={FormikInput} maxLength="4" placeholder="Eg. 1996" />
                          <label htmlFor="year" className="text-xs text-gray-800 dark:text-white select-none">
                            YY
                          </label>
                          {touched.year && errors.year && (
                            <p className="error" style={{ color: 'red' }}>
                              {errors.year}{' '}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 ">
                      <label htmlFor="address" className="text-sm text-gray-800 dark:text-white select-none">
                        Address
                      </label>
                      <Field id="address" name="address" component={FormikInput} placeholder="eg. Kathmandu" />
                    </div>
                  </div>
                  <div className="mb-2 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`text-white h-9 px-5 rounded bg-blue-600 
                      ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-600'}`}
                    >
                      Update
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>

          {/* <h1>Market</h1> */}
          {/* <CustomAreaChart showBush={false} data={[]} /> */}
          {/* <h1 className="text-2xl mb-3">My Portfolio</h1> */}
          {/* <SortableTable columns={columns} data={tableData} /> */}
        </div>
      </main>
    </ProfileLayout>
  );
}

export default EditInformation;

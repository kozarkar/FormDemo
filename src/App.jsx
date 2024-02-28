import './App.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';


function App() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);
  }

  const regexPatterns = {
    alphabestAndSpacesOnly: {value : /^[a-zA-Z\s]+$/, message: 'alphabets and spaces'},
    numbersOnly: {value : /^\d+$/, message: 'numeric values'},
  }

  // State to manage field dependency
  const [fieldsDependency, setFieldsDependency] = useState({
    firstName: { disabled: false, hide: false, required: true, patternValue: regexPatterns.alphabestAndSpacesOnly.value, patternMessage: regexPatterns.alphabestAndSpacesOnly.message, minLength: 1, maxLength: 50 },
    lastName: { disabled: false, hide: false, required: true, patternValue: regexPatterns.alphabestAndSpacesOnly.value, patternMessage: regexPatterns.alphabestAndSpacesOnly.message, minLength: 1, maxLength: 50 },
    hasAccount: { disabled: false, hide: false, required: true, patternValue: null, patternMessage: null, minLength: null, maxLength: null },
    accountNo: { disabled: false, hide: false, required: true, patternValue: regexPatterns.numbersOnly.value, patternMessage: regexPatterns.numbersOnly.message, minLength: 14, maxLength: 14 },
  });

  // Function to handle dependency updates
  const handleDependencyUpdate = (fieldName, dependencyType, value) => {
    setFieldsDependency(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        [dependencyType]: value,
      }
    }));
  }

  const handleInputChange = (field) => {
    trigger(field); // Trigger validation for the specified field
  }



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='dataForm'>
        <label htmlFor="firstName">Firstname</label>
        <input className='form-field' name='firstName' type="text"
          {...register('firstName', {
            required: {
              value: fieldsDependency.firstName.required,
              message: 'First name is required'
            },
            pattern: {
              value: fieldsDependency.firstName.patternValue,
              message: `First name can only contain ${fieldsDependency.firstName.patternMessage}`
            },
            minLength: {
              value: fieldsDependency.firstName.minLength,
              message: `First name must be at least ${fieldsDependency.firstName.minLength} chars`
            },
            maxLength: {
              value: fieldsDependency.firstName.maxLength,
              message: `First name must be at most ${fieldsDependency.firstName.maxLength} chars`
            }
          })}
          disabled={fieldsDependency.firstName.disabled}
          style={{ display: fieldsDependency.firstName.hide ? 'none' : 'block' }}
          onKeyUp={() => handleInputChange('firstName')} 
        />
        {<span>{errors.firstName && errors.firstName.message}</span>}
        <label htmlFor="lastName">Lastname</label>
        <input className='form-field' name='lastName' type="text"
          {...register('lastName', {
            required: {
              value: fieldsDependency.lastName.required,
              message: 'Last name is required'
            },
            pattern: {
              value: fieldsDependency.lastName.patternValue,
              message: `First name can only contain ${fieldsDependency.lastName.patternMessage}`
            },
            minLength: {
              value: fieldsDependency.lastName.minLength,
              message: `Last name must be at least ${fieldsDependency.lastName.minLength} chars`
            },
            maxLength: {
              value: fieldsDependency.lastName.maxLength,
              message: `Last name must be at most ${fieldsDependency.lastName.maxLength} chars`
            }
          })}
          disabled={fieldsDependency.lastName.disabled}
          style={{ display: fieldsDependency.lastName.hide ? 'none' : 'block' }}
          onKeyUp={() => handleInputChange('lastName')} 
        />
        {<span>{errors.lastName && errors.lastName.message}</span>}
        <label htmlFor="hasAccount">Does student have a bank account?</label>
        <select className='form-field' name='hasAccount'
          {...register('hasAccount', {
            required: {
              value: fieldsDependency.hasAccount.required,
              message: 'This field is required'
            },
            pattern: {},
            minLength: {},
            maxLength: {}
          })}
          onChange={(e) => handleDependencyUpdate('accountNo', 'disabled', e.target.value === 'no')} >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {<span>{errors.hasAccount && errors.hasAccount.message}</span>}
        <label htmlFor="accountNo">Account No.</label>
        <input className='form-field' name='accountNo' type="text"
          {...register('accountNo', {
            required: {
              value: fieldsDependency.accountNo.required,
              message: 'Account No. is required'
            },
            pattern: {
              value: fieldsDependency.accountNo.patternValue,
              message: `Account No. can only contain ${fieldsDependency.accountNo.patternMessage}`
            },
            minLength: {
              value: fieldsDependency.accountNo.minLength,
              message: `Account No. must be at least ${fieldsDependency.accountNo.minLength} chars`
            },
            maxLength: {
              value: fieldsDependency.accountNo.maxLength,
              message: `Account No. must be at most ${fieldsDependency.accountNo.maxLength} chars`
            }
          })}
          disabled={fieldsDependency.accountNo.disabled}
          style={{ display: fieldsDependency.accountNo.hide ? 'none' : 'block' }}
          onKeyUp={() => handleInputChange('accountNo')} 
        />
        {<span>{errors.accountNo && errors.accountNo.message}</span>}
        <button type='submit'>Save</button>
      </form>
    </>
  )
}

export default App

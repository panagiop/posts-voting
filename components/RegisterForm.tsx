'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import useRegisterUserMutation from '@/api-calls/useRegisterUserMutation';

export default function RegisterForm() {
    const {
        mutate: registerUser,
        isLoading,
        error
    } = useRegisterUserMutation();

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    // eslint-disable-next-line consistent-return
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        registerUser(formValues);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const inputStyle =
        'w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <form onSubmit={onSubmit}>
            {error?.message && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error.message}
                </p>
            )}
            <div className="mb-6">
                <input
                    required
                    type="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`${inputStyle}`}
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${inputStyle}`}
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${inputStyle}`}
                />
            </div>
            <button
                type="submit"
                style={{ backgroundColor: `${isLoading ? '#ccc' : '#3446eb'}` }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={isLoading}
            >
                {isLoading ? 'loading...' : 'Sign Up'}
            </button>
        </form>
    );
}

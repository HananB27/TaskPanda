import { useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        userName: "",
        userPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        id: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        alert(data.message || "Error creating user");
    };

    return (
        <div className="bg-white p-10">
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="userPassword" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="id" placeholder="ID" onChange={handleChange} required />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

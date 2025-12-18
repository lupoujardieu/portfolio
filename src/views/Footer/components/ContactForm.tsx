import { type FormEvent } from "react";
import "./ContactForm.css";

export default function ContactForm() {
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Nom" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" placeholder="votre message" required></textarea>
            <button type="submit">Envoyer</button>
        </form>
    );
}

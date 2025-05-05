import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { FormContext } from "./FormContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Foot } from "../footer/foot";
import FormContext from "./FormContext";



const Formulaire = () => {
	const { formData, updateFormData, resetFormData } = useContext(FormContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		updateFormData(name, value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { prenom, nom, email, password } = formData;
		if (!prenom || !nom || !email || !password) {
			toast.error("Veuillez remplir tous les champs.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("Adresse email invalide.");
			return;
		}

		if (password.length < 6) {
			toast.error("Le mot de passe doit contenir au moins 6 caractères.");
			return;
		}

		try {
			const response = await fetch("http://localhost:3700/api/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prenom: formData.prenom,
					nom: formData.nom,
					email: formData.email,
					password: formData.password,
				}),
			});
			console.log(formData);

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "Erreur d'inscription");

			localStorage.setItem("token", data.token);
			toast.success("Inscription réussie !");
			resetFormData();
			navigate("/login");
		} catch (error) {
			toast.error("erreur " + error.message);
			console.error("Erreur lors de l'inscription :", error);
		}
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				style={{
					maxWidth: "500px",
					paddingTop: "5rem",
				}}
				className="container shadow flex-column rounded"
			>
				<h2 className="text-center">Formulaire d'inscription</h2>
				<div className="row">
					<Form.Group
						className="col-12 col-md-6 mb-2"
						controlId="formBasicEmail"
					>
						<Form.Label>Prenom</Form.Label>
						<Form.Control
							style={{
								maxWidth: "100%",
							}}
							className="m-0"
							name="prenom"
							value={formData.prenom || ""}
							onChange={handleChange}
							type="text"
							placeholder="Renseignez votre prénom"
						/>
					</Form.Group>
					<Form.Group
						className="col-12 col-md-6 mb-2"
						controlId="formBasicEmail"
					>
						<Form.Label>Nom</Form.Label>
						<Form.Control
							style={{
								maxWidth: "100%",
							}}
							className="m-0"
							name="nom"
							value={formData.nom || ""}
							onChange={handleChange}
							type="text"
							placeholder="Renseignez votre nom"
						/>
					</Form.Group>
				</div>

				<Form.Group className="mb-2" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						style={{
							maxWidth: "100%",
						}}
						className="m-0"
						name="email"
						value={formData.email || ""}
						onChange={handleChange}
						type="email"
						placeholder="Renseignez votre email"
					/>
				</Form.Group>

				<Form.Group className="mb-2" controlId="formBasicPassword">
					<Form.Label>Mot de passe</Form.Label>
					<Form.Control
						style={{
							maxWidth: "100%",
						}}
						className="m-0"
						name="password"
						value={formData.password || ""}
						onChange={handleChange}
						type="password"
						placeholder="Mot de passe"
					/>
				</Form.Group>

				<Button className="mx-auto px-5" variant="primary" type="submit">
					Submit
				</Button>

				<p
					className="mt-2"
					style={{ fontSize: "15px", color: "#040265", textAlign: "center" }}
				>
					Connectez-vous si vous avez un compte:{" "}
					<Link to={"/Login"} style={{ textDecoration: "underline" }}>
						Se connecter
					</Link>
				</p>
			</Form>
			<Foot />
		</>
	);
};

export default Formulaire;

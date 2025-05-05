import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Foot } from "../footer/foot";
import AuthContext from "./useContext";
import FormContext from "./formContext";


const Login = () => {
	const { formData, updateFormData, resetFormData } = useContext(FormContext);
	const { fetchProfil,url } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		updateFormData(name, value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${url}/api/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "Erreur de connexion");

			localStorage.setItem("token", data.token);
			await fetchProfil();
			toast.success(" Connexion réussie !");
			resetFormData();
			navigate("/");
		} catch (error) {
			toast.error("erreur de connection" + error.message);
			console.error("Erreur lors de la connexion :", error);
		}
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				style={{
					maxWidth: "500px",
					paddingTop: "6rem",
					paddingBottom: "2.9rem",
				}}
				className="container shadow flex-column rounded"
			>
				<h2 className="text-center">Connexion</h2>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						style={{ maxWidth: "100%" }}
						className="m-0"
						name="email"
						value={formData.email || ""}
						onChange={handleChange}
						type="email"
						placeholder="Renseignez votre email"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Mot de passe</Form.Label>
					<Form.Control
						style={{ maxWidth: "100%" }}
						className="m-0"
						name="password"
						value={formData.password || ""}
						onChange={handleChange}
						type="password"
						placeholder="Mot de passe"
					/>
				</Form.Group>

				<Button className="mx-auto px-5" variant="primary" type="submit">
					Se connecter
				</Button>

				<p
					className="mt-2"
					style={{ fontSize: "15px", color: "#040265", textAlign: "center" }}
				>
					Inscrivez vous si vous n'avez pas de compte:{" "}
					<Link to={"/inscription"} style={{ textDecoration: "underline" }}>
						S'inscrire
					</Link>
				</p>
			</Form>
			<Foot />
		</>
	);
};

export default Login;

import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                borderBottom: "1px solid #ddd",
            }}
        >
            <h2>Smart Hotel Platform</h2>

            <button onClick={logout}>
                Logout
            </button>
        </nav>
    );
}
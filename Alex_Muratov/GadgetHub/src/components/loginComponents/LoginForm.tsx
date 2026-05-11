import { useState, FormEvent } from "react";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../common/Form/InputField";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const validate = (): boolean => {
        const newErrors: { username?: string; password?: string } = {};

        if (!username.trim()) newErrors.username = "Введите логин";
        else if (username.length < 3) newErrors.username = "Логин должен быть не менее 3 символов";

        if (!password) newErrors.password = "Введите пароль";
        else if (password.length < 6) newErrors.password = "Пароль должен быть не менее 6 символов";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;

        setLoading(true);
        console.log("Форма отправлена", username, password);
        const result = await dispatch(login({ username: username.trim(), password }));
        setLoading(false);

        if (login.fulfilled.match(result)) {
            navigate("/catalog");
        } else {
            setServerError(result.payload as string);
        }
    };

    return (
        <div className="flex flex-col gap-5 items-center">
            <h1 className="text-[28px] font-bold text-center">
                Добро пожаловать!
            </h1>

            <div className="w-[382px] bg-white rounded-lg p-10">
                {serverError && (
                    <div className="p-3 mb-4 bg-red-50 text-red-500 rounded-lg text-sm text-center">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <InputField
                        label="Логин"
                        value={username}
                        placeholder="Введите логин"
                        error={errors.username}
                        isRequired={true}
                        onChange={(value) => {
                            setUsername(value);
                            if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
                            if (serverError) setServerError("");
                        }}
                    />

                    <InputField
                        label="Пароль"
                        type="password"
                        value={password}
                        placeholder="Введите пароль"
                        error={errors.password}
                        isRequired={true}
                        onChange={(value) => {
                            setPassword(value);
                            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                            if (serverError) setServerError("");
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary bg-blue-def text-white hover:bg-blue-hov w-full"
                    >
                        {loading ? "Загрузка..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
}
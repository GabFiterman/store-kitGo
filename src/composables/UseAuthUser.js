import { ref } from "vue";
import { useSupabase } from "boot/supabase";
const user = ref(null);

const useAuthUser = () => {
    const { supabase } = useSupabase();

    const login = async (email, password) => {
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }

        console.log("User logged in: ", user, session);
        return { user, session };
    };

    const loginWithSocialProvider = async (provider) => {
        const { user, session, error } = await supabase.auth.signIn({
            provider,
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log("User logged in: ", user);
        return { user, session };
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        console.log("Logged out!");
        if (error) {
            throw new Error(error.message);
        }
    };

    const isLogged = () => {
        return !!user.value;
    };

    const register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            {
                data: meta,
                redirectTo: `${window.location.origin}/me?formEmail=registerConfirmation`,
            }
        );

        if (error) {
            throw new Error(error.message);
        }

        console.log("User successfuly registered: ", user);
        return user;
    };

    const update = async (data) => {
        const { error } = await supabase.auth.update(data);
        if (error) {
            throw new Error(error.message);
        }

        console.log("User successfuly updated: ", user);
        return user;
    };

    const sendPasswordResetEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasswordForEmail(
            email
        );

        if (error) {
            throw new Error(error.message);
        }

        console.log("Password reset email sent to: ", user);
        return user;
    };

    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLogged,
        register,
        update,
        sendPasswordResetEmail,
    };
};

export default useAuthUser;

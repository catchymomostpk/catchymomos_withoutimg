import { useState } from "react";
import { useLocation } from "wouter";
import { BeanOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { setAuthToken } from "@/lib/auth";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        username,
        password,
      });
      
      const data = await response.json();
      setAuthToken(data.user.id);
      
      toast({
        title: "Login successful",
        description: `Welcome ${data.user.username}!`,
      });
      
      // Redirect based on user type
      if (data.user.username === "admin") {
        navigate("/admin");
      } else {
        navigate("/menu");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen login-gradient flex items-center justify-center px-4 py-8 sm:py-0 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
        backgroundImage: `url('https://i.pinimg.com/736x/d5/76/4c/d5764cab71d2d735155512b090e5379d.jpg')`
      }}></div>

      {/* Virat Kohli with Momos Image Overlay */}
      <div className="absolute top-8 right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
        <img
          src="https://i.pinimg.com/736x/17/6e/ae/176eae439118ceb91d00774b112bbc11.jpg"
          alt="Virat Kohli with Momos"
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="w-full max-w-md shadow-2xl border border-white/20 backdrop-blur-sm bg-white/95 relative z-10">
        <CardContent className="pt-8 pb-10 px-6 sm:px-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-black rounded-full flex items-center justify-center shadow-lg">
              <BeanOff className="text-2xl text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800" data-testid="login-title">Welcome Back</h2>
            <p className="text-sm text-gray-600 mt-2 sm:text-base" data-testid="login-subtitle">
              Sign in to your Catchy Momos account
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm font-medium text-secondary">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 text-sm sm:text-base"
                data-testid="input-username"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm font-medium text-secondary">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 text-sm sm:text-base pr-12"
                  data-testid="input-password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground text-sm font-medium hover:text-secondary transition-colors"
                  data-testid="button-toggle-password"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-accent transition-colors"
              disabled={isLoading}
              data-testid="button-sign-in"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

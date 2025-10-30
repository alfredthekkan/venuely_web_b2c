import OtpLogin from "../../components/OtpLogin";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

export default function PhoneAuthForm() {
    return (
        <div className="min-h-screen flex flex-col justify-start p-4 pb-20 pt-8" style={{
            backgroundColor: 'hsl(var(--brand-background))'
        }}>
            <div className="flex justify-center px-4 mt-10">
                <Card className="border shadow-xl backdrop-blur-sm rounded-lg p-6 w-full min-w-96 max-w-md" style={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--brand-border))'
                }}>
                    <CardContent className="pt-6">
                        <Suspense fallback={<div>Loading...</div>}>
                            <OtpLogin/>
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
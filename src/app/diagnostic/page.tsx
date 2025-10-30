"use client";
import FirebaseDiagnostic from '@/components/FirebaseDiagnostic';

export default function DiagnosticPage() {
    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: 'hsl(var(--brand-background))' }}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
                    Firebase Authentication Diagnostic
                </h1>
                <FirebaseDiagnostic />
            </div>
        </div>
    );
}
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="min-h-screen bg-[var(--color-bg-paper)] flex items-center justify-center p-6 font-body">
            <div className="paper-card max-w-lg w-full text-center py-12 px-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[var(--color-ink)] mb-3">Something went wrong</h2>
                <p className="text-[var(--color-ink-muted)] mb-6">
                    We encountered an unexpected error. Don't worry, your data is safe.
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 text-left overflow-auto max-h-40">
                        <p className="font-mono text-xs text-red-800 whitespace-pre-wrap">{error.message}</p>
                    </div>
                )}

                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary flex items-center gap-2 mx-auto"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reload Application
                </button>
            </div>
        </div>
    );
};

export default ErrorFallback;

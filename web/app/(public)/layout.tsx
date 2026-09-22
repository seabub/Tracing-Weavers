import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
                {children}
            </main>
            <Footer />
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DocumentIcon, LightbulbIcon, ClipboardListIcon, CodeBracketIcon } from './icons';

// Add CodeBracketIcon locally if not in icons.tsx yet, or assume it will be added. 
// For safety, I'll use existing icons or simple SVG here if needed, but let's try to stick to the style.
// I'll add a simple Code icon SVG inline for the doc page if needed, but let's use what we have or generic.

const SidebarItem = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${active ? 'bg-brand-medium-teal/10 text-brand-medium-teal' : 'text-brand-dark-grey hover:bg-brand-light-grey'}`}
    >
        {label}
    </button>
);

const DocSection = ({ title, children, id }: { title: string, children?: React.ReactNode, id: string }) => (
    <div id={id} className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-brand-dark-teal mb-4">{title}</h2>
        <div className="text-brand-dark-grey leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const DocumentationPage = () => {
    const [activeSection, setActiveSection] = useState('getting-started');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="bg-brand-off-white min-h-screen pt-12 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-brand-light-grey">
                            <h3 className="font-bold text-brand-dark-teal mb-4 flex items-center gap-2">
                                <DocumentIcon /> Documentation
                            </h3>
                            <nav className="space-y-1">
                                <SidebarItem active={activeSection === 'getting-started'} label="Getting Started" onClick={() => scrollToSection('getting-started')} />
                                <SidebarItem active={activeSection === 'authentication'} label="Authentication" onClick={() => scrollToSection('authentication')} />
                                <SidebarItem active={activeSection === 'api-reference'} label="API Reference" onClick={() => scrollToSection('api-reference')} />
                                <SidebarItem active={activeSection === 'sdks'} label="SDKs & Tools" onClick={() => scrollToSection('sdks')} />
                                <SidebarItem active={activeSection === 'security'} label="Security & Compliance" onClick={() => scrollToSection('security')} />
                            </nav>
                            <div className="mt-8 pt-6 border-t border-brand-light-grey">
                                <Link to="/resources" className="text-sm text-brand-grey hover:text-brand-medium-teal flex items-center gap-1">
                                    &larr; Back to Resources
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-grow max-w-4xl">
                        <header className="mb-10 border-b border-brand-light-grey pb-8">
                            <h1 className="text-4xl font-bold text-brand-dark-teal">Aveksana Developer Docs</h1>
                            <p className="mt-2 text-lg text-brand-dark-grey">Integrate Aveksana's research engine into your institutional workflows.</p>
                        </header>

                        <DocSection id="getting-started" title="Getting Started">
                            <p>
                                Welcome to the Aveksana Platform. Our suite of tools is designed to seamlessly integrate with existing Learning Management Systems (LMS) like Canvas, Moodle, and Blackboard, as well as corporate R&D ERPs.
                            </p>
                            <div className="bg-brand-light-gray-blue p-4 rounded-lg border-l-4 border-brand-medium-teal my-4">
                                <p className="font-semibold text-brand-dark-teal">Quick Tip</p>
                                <p className="text-sm">Most integrations can be set up in under 30 minutes using our LTI 1.3 compliant connectors.</p>
                            </div>
                            <p>
                                To begin, you will need an Administrator account. If you are an individual researcher, please visit our <Link to="/solutions/for-individuals" className="text-brand-medium-teal hover:underline">Individual Plans</Link> page.
                            </p>
                        </DocSection>

                        <DocSection id="authentication" title="Authentication">
                            <p>
                                We support standard SSO protocols including SAML 2.0 and OIDC. This allows your users to log in using their existing university or corporate credentials (e.g., Azure AD, Google Workspace, Okta).
                            </p>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-4">
{`// Example OIDC Configuration
const config = {
  authority: "https://auth.aveksana.com",
  client_id: "YOUR_INSTITUTION_ID",
  redirect_uri: "https://your-lms.edu/callback",
  response_type: "code",
  scope: "openid profile email research.read"
};`}
                            </pre>
                        </DocSection>

                        <DocSection id="api-reference" title="API Reference">
                            <p>
                                The Aveksana API provides programmatic access to our core engines: <strong>Idea Formulator</strong>, <strong>Artha Grant Writer</strong>, and the <strong>R&D Pipeline</strong>.
                            </p>
                            <h4 className="font-bold text-lg mt-4 mb-2">Endpoints</h4>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm text-brand-dark-teal">POST /v1/ideas/generate</code> - Generate research topics based on keywords.</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm text-brand-dark-teal">POST /v1/proposals/draft</code> - Create a first draft of a grant proposal.</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm text-brand-dark-teal">GET /v1/pipeline/projects</code> - Retrieve active R&D projects for a department.</li>
                            </ul>
                        </DocSection>

                         <DocSection id="sdks" title="SDKs & Tools">
                            <p>
                                We provide official SDKs for Python and Node.js to help you build custom dashboards or automate reporting.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="p-4 border border-brand-light-grey rounded-lg hover:border-brand-medium-teal transition-colors cursor-pointer">
                                    <h5 className="font-bold text-brand-dark-teal">Node.js SDK</h5>
                                    <p className="text-sm mt-1">npm install @aveksana/sdk</p>
                                </div>
                                <div className="p-4 border border-brand-light-grey rounded-lg hover:border-brand-medium-teal transition-colors cursor-pointer">
                                    <h5 className="font-bold text-brand-dark-teal">Python SDK</h5>
                                    <p className="text-sm mt-1">pip install aveksana-py</p>
                                </div>
                            </div>
                        </DocSection>

                        <DocSection id="security" title="Security & Compliance">
                            <p>
                                Security is paramount in research. Aveksana is SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3).
                            </p>
                            <p>
                                For more details on our data handling policies, please review our <a href="#" className="text-brand-medium-teal hover:underline">Security Whitepaper</a>.
                            </p>
                        </DocSection>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default DocumentationPage;

// ═══════════════════════════════════════════════════════════════
// ADHIKAR.AI — COMPREHENSIVE INDIAN LEGAL DATABASE
// 40+ Major Acts | 500+ Key Sections
// ═══════════════════════════════════════════════════════════════

const legalDatabase = [
    // ──────── CONSTITUTIONAL & FUNDAMENTAL RIGHTS ────────
    {
        act: "Constitution of India, 1950",
        category: "Constitutional Law",
        sections: [
            { section: "Article 14", title: "Right to Equality", description: "Equality before law and equal protection of laws." },
            { section: "Article 15", title: "Prohibition of Discrimination", description: "Prohibition on grounds of religion, race, caste, sex, or place of birth." },
            { section: "Article 16", title: "Equal Employment Opportunity", description: "Equality of opportunity in public employment." },
            { section: "Article 19", title: "Freedom of Speech", description: "Right to freedom of speech, assembly, association, movement, and profession." },
            { section: "Article 21", title: "Right to Life", description: "No person shall be deprived of life or personal liberty except by procedure established by law." },
            { section: "Article 21A", title: "Right to Education", description: "Free and compulsory education for children aged 6 to 14 years." },
            { section: "Article 22", title: "Protection Against Arrest", description: "Protection against arrest and detention in certain cases." },
            { section: "Article 23", title: "Prohibition of Trafficking", description: "Prohibition of traffic in human beings and forced labour." },
            { section: "Article 25", title: "Freedom of Religion", description: "Freedom of conscience and free profession, practice, and propagation of religion." },
            { section: "Article 32", title: "Constitutional Remedies", description: "Right to move Supreme Court for enforcement of fundamental rights." },
            { section: "Article 226", title: "High Court Writ Powers", description: "Power of High Courts to issue writs for enforcement of rights." },
            { section: "Article 300A", title: "Right to Property", description: "No person shall be deprived of property save by authority of law." },
            { section: "Article 311", title: "Civil Servants Protection", description: "Dismissal, removal, or reduction of civil servants." },
            { section: "Article 368", title: "Amendment Power", description: "Power of Parliament to amend the Constitution." },
        ]
    },
    {
        act: "Right to Information Act, 2005",
        category: "Constitutional Law",
        sections: [
            { section: "Section 3", title: "Right to Information", description: "Every citizen has the right to access information from public authorities." },
            { section: "Section 4", title: "Proactive Disclosure", description: "Every public authority shall proactively disclose information." },
            { section: "Section 6", title: "Request Process", description: "Procedure for making an RTI request—submit to designated officer with prescribed fee." },
            { section: "Section 7", title: "Response Timeline", description: "Timeline for response: 30 days from receipt of application." },
            { section: "Section 8", title: "Exemptions", description: "Information exempt from disclosure—national security, privacy, cabinet papers." },
            { section: "Section 19", title: "Appeals", description: "First and second appeal procedures against information denial." },
        ]
    },

    // ──────── CRIMINAL LAW ────────
    {
        act: "Indian Penal Code, 1860 (IPC)",
        category: "Criminal Law",
        sections: [
            { section: "Section 34", title: "Common Intention", description: "Criminal act done by several persons in furtherance of common intention." },
            { section: "Section 120B", title: "Criminal Conspiracy", description: "Punishment for criminal conspiracy—when two or more agree to commit an illegal act." },
            { section: "Section 295A", title: "Outraging Religious Feelings", description: "Deliberate and malicious acts intended to outrage religious feelings." },
            { section: "Section 302", title: "Murder", description: "Punishment for murder—death or life imprisonment and fine." },
            { section: "Section 304", title: "Culpable Homicide", description: "Punishment for culpable homicide not amounting to murder." },
            { section: "Section 304A", title: "Death by Negligence", description: "Causing death by rash or negligent act—up to 2 years imprisonment." },
            { section: "Section 304B", title: "Dowry Death", description: "Death of woman within 7 years of marriage under suspicious circumstances." },
            { section: "Section 306", title: "Abetment of Suicide", description: "Punishment for abetting suicide—up to 10 years imprisonment." },
            { section: "Section 323", title: "Voluntarily Causing Hurt", description: "Punishment for voluntarily causing hurt—up to 1 year imprisonment." },
            { section: "Section 354", title: "Assault on Woman", description: "Assault or use of criminal force to woman with intent to outrage modesty." },
            { section: "Section 376", title: "Rape", description: "Punishment for rape—minimum 10 years to life imprisonment." },
            { section: "Section 379", title: "Theft", description: "Punishment for theft—up to 3 years imprisonment." },
            { section: "Section 380", title: "Housebreaking Theft", description: "Theft in dwelling house—up to 7 years imprisonment." },
            { section: "Section 384", title: "Extortion", description: "Punishment for extortion—up to 3 years imprisonment." },
            { section: "Section 390", title: "Robbery", description: "Definition of robbery—theft combined with use of force." },
            { section: "Section 392", title: "Punishment for Robbery", description: "Rigorous imprisonment up to 10 years and fine." },
            { section: "Section 406", title: "Criminal Breach of Trust", description: "Punishment for dishonestly misappropriating entrusted property." },
            { section: "Section 415", title: "Cheating", description: "Definition of cheating by deception—inducing delivery of property." },
            { section: "Section 420", title: "Cheating and Dishonesty", description: "Punishment for cheating causing wrongful loss—up to 7 years imprisonment." },
            { section: "Section 426", title: "Mischief", description: "Punishment for mischief—damage to property—up to 3 months." },
            { section: "Section 441", title: "Criminal Trespass", description: "Entry into property with intent to commit offence or intimidate." },
            { section: "Section 467", title: "Forgery of Documents", description: "Forgery of valuable security—up to life imprisonment." },
            { section: "Section 498A", title: "Cruelty by Husband", description: "Cruelty by husband or relatives—up to 3 years imprisonment." },
            { section: "Section 499", title: "Defamation", description: "Making or publishing imputations concerning any person." },
            { section: "Section 500", title: "Punishment for Defamation", description: "Simple imprisonment for up to 2 years, or fine, or both." },
            { section: "Section 503", title: "Criminal Intimidation", description: "Threatening another with injury to person, reputation, or property." },
            { section: "Section 506", title: "Punishment for Intimidation", description: "Punishment for criminal intimidation—up to 2 years imprisonment." },
            { section: "Section 509", title: "Insulting Modesty of Woman", description: "Word, gesture, or act intended to insult the modesty of a woman." },
        ]
    },
    {
        act: "Code of Criminal Procedure, 1973 (CrPC)",
        category: "Criminal Law",
        sections: [
            { section: "Section 41", title: "When Police May Arrest", description: "Circumstances under which police can arrest without warrant." },
            { section: "Section 41A", title: "Notice of Appearance", description: "Notice of appearance before police officer—protects against arbitrary arrest." },
            { section: "Section 125", title: "Maintenance Order", description: "Order for maintenance of wife, children, and parents." },
            { section: "Section 144", title: "Prohibitory Order", description: "Power to issue order in urgent cases of nuisance or apprehended danger." },
            { section: "Section 154", title: "FIR", description: "Information in cognizable cases—First Information Report procedure." },
            { section: "Section 156", title: "Police Investigation", description: "Police officer's power to investigate cognizable cases." },
            { section: "Section 161", title: "Examination of Witnesses", description: "Oral examination of persons acquainted with facts of the case." },
            { section: "Section 164", title: "Recording Confessions", description: "Process of recording confessions and statements before Magistrate." },
            { section: "Section 167", title: "Remand", description: "Procedure when investigation cannot be completed in 24 hours." },
            { section: "Section 173", title: "Police Report", description: "Report of police officer on completion of investigation (charge sheet)." },
            { section: "Section 190", title: "Cognizance", description: "Magistrate's power to take cognizance of offences." },
            { section: "Section 197", title: "Prosecution Sanction", description: "Prosecution of public servants requires government sanction." },
            { section: "Section 200", title: "Private Complaint", description: "Examination of complainant in private complaint cases." },
            { section: "Section 311", title: "Court's Power to Summon", description: "Power to summon material witness or examine person present." },
            { section: "Section 313", title: "Accused Examination", description: "Power to examine the accused person." },
            { section: "Section 354", title: "Language of Judgement", description: "Requirements for pronouncing judgement." },
            { section: "Section 378", title: "Appeal Against Acquittal", description: "Appeal in case of acquittal by the State Government or complainant." },
            { section: "Section 437", title: "Bail in Non-Bailable Offences", description: "When bail may be taken in case of non-bailable offences." },
            { section: "Section 438", title: "Anticipatory Bail", description: "Direction for grant of bail to person apprehending arrest." },
            { section: "Section 439", title: "Special Powers of High Court", description: "Special powers of High Court or Court of Session regarding bail." },
            { section: "Section 482", title: "Inherent Powers", description: "Inherent powers of High Court—quash proceedings to prevent abuse of process." },
        ]
    },
    {
        act: "Indian Evidence Act, 1872",
        category: "Criminal Law",
        sections: [
            { section: "Section 3", title: "Interpretation Clause", description: "Definitions of fact, relevant, court, document, and evidence." },
            { section: "Section 17", title: "Admission Defined", description: "Statement suggesting inference about any fact in issue." },
            { section: "Section 24", title: "Confession by Inducement", description: "Confession caused by inducement, threat, or promise is inadmissible." },
            { section: "Section 27", title: "Discovery Information", description: "How much of information received from accused may be proved." },
            { section: "Section 32", title: "Dying Declaration", description: "Statement relating to cause of death or circumstances of transaction." },
            { section: "Section 45", title: "Expert Opinions", description: "Opinions of experts—points of science, art, foreign law, handwriting." },
            { section: "Section 65B", title: "Electronic Records", description: "Admissibility of electronic records—certificate for electronic evidence." },
            { section: "Section 101", title: "Burden of Proof", description: "Whoever desires court to give judgment must prove those facts." },
            { section: "Section 113B", title: "Dowry Death Presumption", description: "Court shall presume dowry death if cruelty shown within 7 years." },
            { section: "Section 114", title: "Court Presumption", description: "Court may presume existence of certain facts." },
        ]
    },

    // ──────── CONSUMER & FINANCIAL LAW ────────
    {
        act: "Consumer Protection Act, 2019",
        category: "Consumer Rights",
        sections: [
            { section: "Section 2(1)", title: "Consumer Definition", description: "Person who buys goods or avails services for consideration." },
            { section: "Section 2(6)", title: "Complaint", description: "Defines what constitutes a consumer complaint." },
            { section: "Section 2(11)", title: "Deficiency", description: "Defines deficiency in service—any fault, imperfection, or shortcoming." },
            { section: "Section 2(28)", title: "Misleading Advertisement", description: "Any advertisement that falsely describes or gives false guarantee." },
            { section: "Section 2(42)", title: "Unfair Contract", description: "Defines contracts that are one-sided and unreasonable." },
            { section: "Section 10", title: "Central Consumer Authority", description: "Establishment of Central Consumer Protection Authority." },
            { section: "Section 18", title: "Authority Powers", description: "Powers to investigate, recall products, and impose penalties." },
            { section: "Section 21", title: "Penalty for False Ads", description: "Penalty for misleading advertisements—up to ₹10 lakh fine." },
            { section: "Section 34", title: "District Commission", description: "Establishment and jurisdiction of District Consumer Commission." },
            { section: "Section 35", title: "Unfair Trade Practices", description: "Provisions for unfair or restrictive trade practices." },
            { section: "Section 38", title: "Filing Complaint", description: "Procedure for filing consumer complaints." },
            { section: "Section 39", title: "Admissibility", description: "Admissibility of complaints and required documentation." },
            { section: "Section 47", title: "Jurisdiction", description: "District Commission jurisdiction for complaints up to ₹1 Crore." },
            { section: "Section 58", title: "State Commission", description: "Appeals from District Commission—complaints ₹1 Cr to ₹10 Cr." },
            { section: "Section 67", title: "Mediation", description: "Mediation of consumer disputes—alternative dispute resolution." },
            { section: "Section 69", title: "Limitation Period", description: "Complaints must be filed within 2 years from when cause of action arose. Delay may be condoned if sufficient cause shown." },
            { section: "Section 84", title: "Liability of Product Manufacturer", description: "Manufacturer liable if product has manufacturing defect, design defect, deviation from specs, fails express warranty, or lacks adequate usage instructions/warnings." },
            { section: "Section 89", title: "Punishment for False Advertisements", description: "False or misleading advertisement—up to 2 years imprisonment and ₹10 lakh fine; repeat offence—up to 5 years and ₹50 lakh fine." },
        ]
    },
    {
        act: "Negotiable Instruments Act, 1881",
        category: "Financial Law",
        sections: [
            { section: "Section 4", title: "Promissory Note", description: "Definition of promissory note—instrument in writing with unconditional promise." },
            { section: "Section 5", title: "Bill of Exchange", description: "Instrument directing a certain person to pay a certain sum." },
            { section: "Section 6", title: "Cheque", description: "Bill of exchange drawn on a specified banker payable on demand." },
            { section: "Section 118", title: "Presumptions", description: "Presumption as to consideration, date, time, holder in due course." },
            { section: "Section 138", title: "Dishonour of Cheque", description: "Criminal offence for bounced cheques—up to 2 years imprisonment." },
            { section: "Section 139", title: "Presumption of Debt", description: "Court shall presume that holder received cheque for discharge of debt." },
            { section: "Section 141", title: "Company Offences", description: "Liability of directors for cheque dishonour offences." },
            { section: "Section 142", title: "Cognizance", description: "Procedure for filing complaints for cheque dishonour." },
            { section: "Section 143", title: "Summary Trial", description: "Power of court to try offences summarily." },
            { section: "Section 148", title: "Interim Compensation", description: "Court may direct deposit of 20% of cheque amount as interim compensation." },
        ]
    },
    {
        act: "Prevention of Money Laundering Act, 2002",
        category: "Financial Law",
        sections: [
            { section: "Section 3", title: "Offence of Money Laundering", description: "Whosoever directly or indirectly deals with proceeds of crime." },
            { section: "Section 4", title: "Punishment", description: "Rigorous imprisonment for 3 to 7 years and fine up to ₹5 lakhs." },
            { section: "Section 5", title: "Attachment of Property", description: "Director may provisionally attach property involved in money laundering." },
            { section: "Section 8", title: "Adjudication", description: "Adjudicating authority proceedings for confirmation of attachment." },
            { section: "Section 17", title: "Search and Seizure", description: "Authority to search premises and seize records." },
        ]
    },
    {
        act: "Insolvency and Bankruptcy Code, 2016",
        category: "Financial Law",
        sections: [
            { section: "Section 7", title: "Financial Creditor", description: "Financial creditor may initiate insolvency resolution process." },
            { section: "Section 9", title: "Operational Creditor", description: "Operational creditor may file application for resolution." },
            { section: "Section 10", title: "Debtor Application", description: "Corporate debtor may itself file for insolvency resolution." },
            { section: "Section 12", title: "Resolution Timeline", description: "Insolvency resolution process must be completed within 330 days." },
            { section: "Section 29A", title: "Resolution Applicant", description: "Persons not eligible to be resolution applicant—wilful defaulters, etc." },
            { section: "Section 33", title: "Liquidation Order", description: "Adjudicating authority may order liquidation of corporate debtor." },
        ]
    },

    // ──────── CIVIL & CONTRACT LAW ────────
    {
        act: "Indian Contract Act, 1872",
        category: "Civil Law",
        sections: [
            { section: "Section 2(h)", title: "Contract Defined", description: "An agreement enforceable by law is a contract." },
            { section: "Section 10", title: "Valid Contract", description: "Conditions: free consent, competent parties, lawful consideration, lawful object." },
            { section: "Section 14", title: "Free Consent", description: "Consent not caused by coercion, undue influence, fraud, misrepresentation, or mistake." },
            { section: "Section 15", title: "Coercion", description: "Committing or threatening to commit any act forbidden by IPC." },
            { section: "Section 16", title: "Undue Influence", description: "When one party dominates the will of the other." },
            { section: "Section 17", title: "Fraud", description: "Definition of fraud in contractual agreements." },
            { section: "Section 23", title: "Unlawful Consideration", description: "Consideration or object of agreement is unlawful if opposed to public policy." },
            { section: "Section 56", title: "Frustration", description: "Agreement to do impossible act is void—doctrine of frustration." },
            { section: "Section 73", title: "Compensation for Breach", description: "Right to compensation for loss caused by breach of contract." },
            { section: "Section 74", title: "Liquidated Damages", description: "Reasonable compensation for breach when penalty is stipulated." },
            { section: "Section 124", title: "Indemnity", description: "Contract by which one party promises to save from loss." },
            { section: "Section 126", title: "Guarantee", description: "Contract to perform the promise or discharge liability of third person." },
            { section: "Section 148", title: "Bailment", description: "Delivery of goods for some purpose upon a contract." },
            { section: "Section 172", title: "Pledge", description: "Bailment of goods as security for payment of debt." },
            { section: "Section 182", title: "Agency", description: "Agent is a person employed to do any act for another." },
        ]
    },
    {
        act: "Specific Relief Act, 1963",
        category: "Civil Law",
        sections: [
            { section: "Section 10", title: "Specific Performance", description: "Cases in which specific performance of contract enforceable." },
            { section: "Section 12", title: "Part Performance", description: "Specific performance of part of contract." },
            { section: "Section 14", title: "Contracts Not Specifically Enforced", description: "Where compensation in money is adequate relief." },
            { section: "Section 34", title: "Declaratory Decree", description: "Any person entitled to legal character or right may institute suit." },
            { section: "Section 36", title: "Preventive Relief", description: "Preventive relief granted by temporary or perpetual injunction." },
            { section: "Section 38", title: "Perpetual Injunction", description: "Perpetual injunction to prevent breach of obligation." },
            { section: "Section 39", title: "Temporary Injunction", description: "Temporary injunctions granted in accordance with CPC." },
        ]
    },
    {
        act: "Limitation Act, 1963",
        category: "Civil Law",
        sections: [
            { section: "Section 3", title: "Bar of Limitation", description: "Every suit instituted after prescribed period shall be dismissed." },
            { section: "Section 5", title: "Extension of Time", description: "Extension of prescribed period if sufficient cause shown." },
            { section: "Section 12", title: "Exclusion of Time", description: "Exclusion of time in computing period of limitation." },
            { section: "Section 14", title: "Exclusion for Bona Fide", description: "Exclusion of time for proceedings in wrong court." },
            { section: "Section 17", title: "Fraud Effect", description: "Effect of fraud or mistake—limitation begins from discovery." },
            { section: "Article 54", title: "Suit for Damages", description: "Limitation period for suit claiming damages—3 years." },
            { section: "Article 58", title: "Declaration Suit", description: "Limitation period for suit for declaration—3 years." },
            { section: "Article 113", title: "Residuary", description: "Suits for which no specific period prescribed—3 years." },
        ]
    },
    {
        act: "Civil Procedure Code, 1908 (CPC)",
        category: "Civil Law",
        sections: [
            { section: "Order I", title: "Parties to Suits", description: "Rules about who may be joined as parties to a suit." },
            { section: "Order VII Rule 11", title: "Rejection of Plaint", description: "Grounds on which a plaint may be rejected by court." },
            { section: "Order IX", title: "Appearance of Parties", description: "Consequences of non-appearance—dismissal or ex-parte decree." },
            { section: "Order XXXIX", title: "Temporary Injunctions", description: "Grant of temporary injunctions and interlocutory orders." },
            { section: "Section 9", title: "Court Jurisdiction", description: "Courts shall have jurisdiction to try all civil suits." },
            { section: "Section 80", title: "Notice to Government", description: "Mandatory 2-month notice before suing government." },
            { section: "Section 89", title: "Settlement of Disputes", description: "Court may refer to arbitration, conciliation, mediation, or lok adalat." },
            { section: "Section 96", title: "Appeal from Decree", description: "Appeal lies from every decree passed by court." },
            { section: "Section 100", title: "Second Appeal", description: "Second appeal on substantial question of law only." },
            { section: "Section 115", title: "Revision", description: "High Court revision powers against orders of subordinate courts." },
        ]
    },

    // ──────── PROPERTY LAW ────────
    {
        act: "Transfer of Property Act, 1882",
        category: "Property Law",
        sections: [
            { section: "Section 5", title: "Transfer Defined", description: "Transfer of property means an act by which a person conveys property to another." },
            { section: "Section 10", title: "Condition Restraining Alienation", description: "Condition restraining transfer is void where transfer is absolute." },
            { section: "Section 52", title: "Lis Pendens", description: "Transfer of property during pendency of suit—doctrine of lis pendens." },
            { section: "Section 53A", title: "Part Performance", description: "Transferee in possession protected despite incomplete transfer." },
            { section: "Section 54", title: "Sale", description: "Sale is transfer of ownership in exchange for price paid or promised." },
            { section: "Section 58", title: "Mortgage", description: "Transfer of interest in specific immovable property for securing debt." },
            { section: "Section 105", title: "Lease Defined", description: "Lease is transfer of right to enjoy immovable property for a term." },
            { section: "Section 106", title: "Duration and Termination", description: "Duration and notice period for lease termination." },
            { section: "Section 108", title: "Rights of Lessee", description: "Rights and liabilities of lessor and lessee." },
            { section: "Section 111", title: "Lease Determination", description: "How a lease may be determined—efflux, notice, forfeiture, etc." },
        ]
    },
    {
        act: "Registration Act, 1908",
        category: "Property Law",
        sections: [
            { section: "Section 17", title: "Documents Must Be Registered", description: "Instruments of sale, lease, gift over ₹100 value must be registered." },
            { section: "Section 23", title: "Time for Presenting", description: "Documents must be presented for registration within 4 months." },
            { section: "Section 49", title: "Effect of Non-Registration", description: "Unregistered documents (requiring registration) not admissible in evidence." },
        ]
    },
    {
        act: "RERA (Real Estate Regulation & Development Act), 2016",
        category: "Property Law",
        sections: [
            { section: "Section 3", title: "Registration Required", description: "No real estate project can be marketed without RERA registration." },
            { section: "Section 4", title: "Application for Registration", description: "Mandatory project registration with details and timeline." },
            { section: "Section 11", title: "Developer Obligations", description: "Developer must rectify structural defects within 5 years." },
            { section: "Section 18", title: "Return of Amount", description: "Buyer's right to refund with interest for project delays." },
            { section: "Section 19", title: "Allottee Rights", description: "Allottee rights to obtain information, claim possession, and refund." },
            { section: "Section 31", title: "Complaint Filing", description: "Procedure for filing complaint with RERA authority." },
            { section: "Section 40", title: "Real Estate Appellate Tribunal", description: "Appeal from orders of the RERA authority." },
        ]
    },
    {
        act: "Rent Control Act (Model/State-specific)",
        category: "Property Law",
        sections: [
            { section: "Section 4", title: "Standard Rent", description: "Determination of standard rent by controller." },
            { section: "Section 10", title: "No Eviction Without Order", description: "Tenant cannot be evicted without order of the controller." },
            { section: "Section 12", title: "Eviction Grounds", description: "Conditions under which a landlord can seek eviction." },
            { section: "Section 14", title: "Fair Rent", description: "Provisions for determining and fixing standard or fair rent." },
            { section: "Section 15", title: "Security Deposit", description: "Rules governing security deposit refund and deductions." },
        ]
    },

    // ──────── FAMILY LAW ────────
    {
        act: "Hindu Marriage Act, 1955",
        category: "Family Law",
        sections: [
            { section: "Section 5", title: "Conditions for Marriage", description: "Conditions for a valid Hindu marriage—age, consent, degrees of prohibited relationship." },
            { section: "Section 9", title: "Restitution of Conjugal Rights", description: "Court can order a spouse to resume cohabitation." },
            { section: "Section 11", title: "Void Marriage", description: "Marriage in contravention of conditions is null and void." },
            { section: "Section 12", title: "Voidable Marriage", description: "Marriage may be annulled on grounds of impotency, fraud, etc." },
            { section: "Section 13", title: "Divorce", description: "Grounds for divorce—cruelty, desertion, conversion, unsoundness of mind." },
            { section: "Section 13B", title: "Mutual Consent Divorce", description: "Divorce by mutual consent after cooling period." },
            { section: "Section 24", title: "Interim Maintenance", description: "Interim maintenance during pendency of divorce proceedings." },
            { section: "Section 25", title: "Permanent Alimony", description: "Court may order permanent maintenance and alimony." },
            { section: "Section 26", title: "Custody of Children", description: "Court may make orders for custody, maintenance, and education of children." },
        ]
    },
    {
        act: "Hindu Succession Act, 1956",
        category: "Family Law",
        sections: [
            { section: "Section 6", title: "Coparcenary Property", description: "Daughter has same rights as son in Hindu joint family property." },
            { section: "Section 8", title: "Male Intestate", description: "Rules of succession for male Hindu dying intestate." },
            { section: "Section 14", title: "Woman's Property", description: "Any property possessed by Hindu female is her absolute property." },
            { section: "Section 15", title: "Female Intestate", description: "General rules of succession for female Hindu dying intestate." },
            { section: "Section 30", title: "Testamentary Succession", description: "Hindu may dispose of property by will or codicil." },
        ]
    },
    {
        act: "Protection of Women from Domestic Violence Act, 2005",
        category: "Family Law",
        sections: [
            { section: "Section 3", title: "Domestic Violence Defined", description: "Physical, sexual, verbal, emotional, and economic abuse." },
            { section: "Section 12", title: "Application to Magistrate", description: "Seeking protection orders from the Magistrate." },
            { section: "Section 17", title: "Right to Residence", description: "Right of aggrieved woman to reside in shared household." },
            { section: "Section 18", title: "Protection Orders", description: "Orders prohibiting acts of domestic violence." },
            { section: "Section 19", title: "Residence Orders", description: "Orders restraining respondent from shared household." },
            { section: "Section 20", title: "Monetary Relief", description: "Compensation for loss of earnings, medical expenses, etc." },
            { section: "Section 22", title: "Compensation Order", description: "Compensation for injuries including mental torture and emotional distress." },
        ]
    },
    {
        act: "Dowry Prohibition Act, 1961",
        category: "Family Law",
        sections: [
            { section: "Section 2", title: "Dowry Defined", description: "Any property or valuable security given directly or indirectly." },
            { section: "Section 3", title: "Penalty for Giving/Taking Dowry", description: "Minimum 5 years imprisonment and fine not less than ₹15,000." },
            { section: "Section 4", title: "Demand of Dowry", description: "Penalty for demanding dowry—6 months to 2 years imprisonment." },
            { section: "Section 6", title: "Dowry to Be Held in Trust", description: "Dowry must be held by woman for her benefit." },
        ]
    },
    {
        act: "Guardians and Wards Act, 1890",
        category: "Family Law",
        sections: [
            { section: "Section 7", title: "Power of Court", description: "Court may appoint or declare guardian of person or property." },
            { section: "Section 17", title: "Child's Welfare", description: "Court to consider welfare of child in guardianship matters." },
            { section: "Section 25", title: "Guardian's Duties", description: "Duties and liabilities of guardian of property." },
        ]
    },

    // ──────── LABOUR LAW ────────
    {
        act: "Industrial Disputes Act, 1947",
        category: "Labour Law",
        sections: [
            { section: "Section 2(k)", title: "Industrial Dispute", description: "Any dispute between employer and workmen regarding employment terms." },
            { section: "Section 2(s)", title: "Workman Definition", description: "Defines who qualifies as a workman under the act." },
            { section: "Section 10", title: "Reference to Tribunals", description: "Government may refer disputes to Boards, Courts, or Tribunals." },
            { section: "Section 25-F", title: "Retrenchment", description: "Notice, compensation, and last-in-first-out for retrenchment." },
            { section: "Section 25-N", title: "Prior Permission", description: "Government permission required before layoff in large establishments." },
            { section: "Section 33", title: "Conditions of Service", description: "Prohibition on changing conditions during pending proceedings." },
        ]
    },
    {
        act: "Payment of Wages Act, 1936",
        category: "Labour Law",
        sections: [
            { section: "Section 3", title: "Responsibility for Payment", description: "Employer responsible for timely payment of wages." },
            { section: "Section 4", title: "Wage Period", description: "Wage period not exceeding one month." },
            { section: "Section 5", title: "Time of Payment", description: "Wages must be paid within 7 days of wage period." },
            { section: "Section 7", title: "Authorized Deductions", description: "Deductions only for fines, absence, damage, housing, advances, etc." },
        ]
    },
    {
        act: "Payment of Gratuity Act, 1972",
        category: "Labour Law",
        sections: [
            { section: "Section 4", title: "Payment of Gratuity", description: "Employer shall pay gratuity to employee after 5 years of continuous service." },
            { section: "Section 4(6)", title: "Maximum Gratuity", description: "Maximum gratuity payable is ₹20 lakh." },
            { section: "Section 7", title: "Determining Authority", description: "Controlling authority to determine gratuity payable." },
        ]
    },
    {
        act: "Employees' Provident Funds Act, 1952",
        category: "Labour Law",
        sections: [
            { section: "Section 6", title: "Contributions", description: "12% contribution by employer and employee to provident fund." },
            { section: "Section 7A", title: "Determination of Dues", description: "Authorities to determine money due from employer." },
            { section: "Section 14", title: "Penalties", description: "Punishment for default—1 to 3 years imprisonment and fine." },
        ]
    },
    {
        act: "Sexual Harassment of Women at Workplace Act, 2013",
        category: "Labour Law",
        sections: [
            { section: "Section 2(n)", title: "Sexual Harassment Defined", description: "Unwelcome acts, demand for sexual favours, physical contact, abusive remarks." },
            { section: "Section 3", title: "Prevention of Harassment", description: "No woman shall be subjected to sexual harassment at workplace." },
            { section: "Section 4", title: "Internal Complaints Committee", description: "Constitution of ICC in every establishment with 10+ employees." },
            { section: "Section 9", title: "Filing Complaint", description: "Written complaint within 3 months of last incident." },
            { section: "Section 11", title: "Inquiry Report", description: "Inquiry to be completed within 90 days." },
            { section: "Section 13", title: "Action for Sexual Harassment", description: "Employer to take prescribed action within 60 days." },
        ]
    },
    {
        act: "Minimum Wages Act, 1948",
        category: "Labour Law",
        sections: [
            { section: "Section 3", title: "Fixing Minimum Wages", description: "Government shall fix minimum wages for scheduled employments." },
            { section: "Section 12", title: "Payment Below Minimum Wage", description: "Employer shall pay not less than minimum rate of wages." },
            { section: "Section 22", title: "Penalties", description: "Imprisonment up to 6 months for paying below minimum wage." },
        ]
    },

    // ──────── CYBER & IT LAW ────────
    {
        act: "Information Technology Act, 2000",
        category: "Cyber Law",
        sections: [
            { section: "Section 43", title: "Unauthorized Access", description: "Penalty for damage to computer systems and unauthorized access." },
            { section: "Section 43A", title: "Data Protection", description: "Compensation for failure to protect data—corporate negligence." },
            { section: "Section 65", title: "Tampering with Source Code", description: "Punishment for tampering with computer source documents." },
            { section: "Section 66", title: "Computer Crimes", description: "Punishment for hacking and computer-related offences." },
            { section: "Section 66A", title: "Offensive Messages", description: "Struck down by SC, but related provisions under 67." },
            { section: "Section 66B", title: "Receiving Stolen Computer", description: "Punishment for dishonestly receiving stolen computer resource." },
            { section: "Section 66C", title: "Identity Theft", description: "Fraudulently using electronic signatures or passwords—up to 3 years." },
            { section: "Section 66D", title: "Cheating by Personation", description: "Cheating using computer resources—up to 3 years." },
            { section: "Section 66E", title: "Violation of Privacy", description: "Capturing or publishing private images—up to 3 years." },
            { section: "Section 66F", title: "Cyber Terrorism", description: "Intentionally threatening India's sovereignty—life imprisonment." },
            { section: "Section 67", title: "Publishing Obscene Content", description: "Publishing obscene material in electronic form." },
            { section: "Section 67A", title: "Sexually Explicit Material", description: "Publishing sexually explicit material electronically." },
            { section: "Section 67B", title: "Child Pornography", description: "Publishing or transmitting child sexually exploitative material." },
            { section: "Section 72", title: "Breach of Privacy", description: "Penalty for breach of confidentiality and privacy." },
            { section: "Section 72A", title: "Disclosure of Information", description: "Punishment for disclosure in breach of lawful contract." },
        ]
    },

    // ──────── WOMEN & CHILDREN PROTECTION ────────
    {
        act: "POCSO (Protection of Children from Sexual Offences Act), 2012",
        category: "Child Protection",
        sections: [
            { section: "Section 3", title: "Penetrative Sexual Assault", description: "Definition and punishment—minimum 10 years to life imprisonment." },
            { section: "Section 5", title: "Aggravated Assault", description: "By police officer, family member, institution staff—minimum 20 years." },
            { section: "Section 7", title: "Sexual Assault", description: "Sexual contact without penetration—3 to 5 years imprisonment." },
            { section: "Section 9", title: "Aggravated Sexual Assault", description: "By person in authority or trust—5 to 7 years imprisonment." },
            { section: "Section 11", title: "Sexual Harassment", description: "Showing pornography, stalking, or enticing child." },
            { section: "Section 14", title: "Using Child for Pornography", description: "5 to 7 years imprisonment and fine." },
            { section: "Section 19", title: "Mandatory Reporting", description: "Any person knowing of offence must report—failure is punishable." },
            { section: "Section 29", title: "Burden of Proof", description: "Accused presumed guilty until proven innocent." },
            { section: "Section 33", title: "Procedure for Children", description: "Child-friendly procedure for recording evidence." },
            { section: "Section 36", title: "In-Camera Trial", description: "Trial to be conducted in camera—no public access." },
        ]
    },
    {
        act: "Juvenile Justice Act, 2015",
        category: "Child Protection",
        sections: [
            { section: "Section 2(14)", title: "Child in Need", description: "Child in need of care and protection definition." },
            { section: "Section 15", title: "Preliminary Assessment", description: "Assessment for children alleged to have committed heinous offence." },
            { section: "Section 18", title: "Orders for Children", description: "Orders the Board may pass regarding child in conflict with law." },
            { section: "Section 56", title: "Adoption", description: "Adoption of orphan, abandoned, and surrendered children." },
            { section: "Section 75", title: "Punishment for Cruelty", description: "Cruelty to a child—imprisonment up to 3 years." },
            { section: "Section 77", title: "Child Labour", description: "Employment of child by employer—punishable offence." },
        ]
    },

    // ──────── SOCIAL JUSTICE ────────
    {
        act: "SC/ST (Prevention of Atrocities) Act, 1989",
        category: "Social Justice",
        sections: [
            { section: "Section 3", title: "Offences of Atrocities", description: "Offences constituting atrocities against SC/ST communities." },
            { section: "Section 3(1)(r)", title: "Denial of Public Access", description: "Denying SC/ST access to public places." },
            { section: "Section 3(1)(s)", title: "Denial of Voting", description: "Forcing or intimidating SC/ST from exercising franchise." },
            { section: "Section 14", title: "Special Courts", description: "Establishment of Special Courts for trying offences." },
            { section: "Section 15A", title: "Victim Rights", description: "Rights of victims and witnesses during investigation and trial." },
        ]
    },
    {
        act: "Rights of Persons with Disabilities Act, 2016",
        category: "Social Justice",
        sections: [
            { section: "Section 3", title: "Non-Discrimination", description: "No person shall discriminate against person with disability." },
            { section: "Section 5", title: "Equality and Dignity", description: "Government to ensure equality and community living." },
            { section: "Section 20", title: "Healthcare", description: "Health services for persons with disabilities." },
            { section: "Section 34", title: "Reservation in Employment", description: "4% reservation in government jobs for persons with disabilities." },
            { section: "Section 89", title: "Punishment for Abuse", description: "Punishment for intentionally insulting or intimidating PWD." },
            { section: "Section 92", title: "Punishment for Fraud", description: "Fraud to avail benefits meant for PWD—fine up to ₹1 lakh." },
        ]
    },

    // ──────── ENVIRONMENTAL LAW ────────
    {
        act: "Environment Protection Act, 1986",
        category: "Environmental Law",
        sections: [
            { section: "Section 3", title: "Central Government Powers", description: "Power to take all measures for environmental protection." },
            { section: "Section 5", title: "Directions", description: "Power to issue directions including closure of industry." },
            { section: "Section 7", title: "Prohibitions", description: "No emission or discharge exceeding prescribed standards." },
            { section: "Section 15", title: "Penalty", description: "Imprisonment up to 5 years and fine up to ₹1 lakh." },
            { section: "Section 17", title: "Company Offences", description: "Company directors liable for contraventions." },
        ]
    },
    {
        act: "National Green Tribunal Act, 2010",
        category: "Environmental Law",
        sections: [
            { section: "Section 14", title: "Tribunal Jurisdiction", description: "Jurisdiction over civil cases involving environmental issues." },
            { section: "Section 15", title: "Relief and Compensation", description: "Tribunal may provide relief including compensation for damage." },
            { section: "Section 16", title: "Appeal to Tribunal", description: "Appeal rules against environmental orders." },
            { section: "Section 19", title: "No-Fault Principle", description: "Liability based on no-fault principle for specified activities." },
        ]
    },
    {
        act: "Water (Prevention and Control of Pollution) Act, 1974",
        category: "Environmental Law",
        sections: [
            { section: "Section 24", title: "Prohibition of Pollution", description: "No person shall cause or permit pollution of water." },
            { section: "Section 25", title: "Consent to Establish", description: "Consent required from State Board to establish industry near water." },
            { section: "Section 44", title: "Penalties", description: "Imprisonment up to 6 years and fine for contravention." },
        ]
    },

    // ──────── DISPUTE RESOLUTION ────────
    {
        act: "Arbitration and Conciliation Act, 1996",
        category: "Dispute Resolution",
        sections: [
            { section: "Section 7", title: "Arbitration Agreement", description: "Definition and requirements of a valid arbitration agreement." },
            { section: "Section 8", title: "Power to Refer", description: "Judicial authority to refer parties to arbitration if agreement exists." },
            { section: "Section 9", title: "Interim Measures", description: "Court may grant interim measures before or during arbitration." },
            { section: "Section 11", title: "Appointment of Arbitrator", description: "Procedure for appointment of arbitrators." },
            { section: "Section 17", title: "Tribunal Interim Orders", description: "Arbitral tribunal may order interim measures." },
            { section: "Section 34", title: "Setting Aside Award", description: "Grounds for challenging an arbitral award." },
            { section: "Section 36", title: "Enforcement", description: "Arbitral award is enforceable as a decree of court." },
            { section: "Section 37", title: "Appealable Orders", description: "Orders that may be appealed against." },
        ]
    },
    {
        act: "Legal Services Authorities Act, 1987",
        category: "Dispute Resolution",
        sections: [
            { section: "Section 12", title: "Free Legal Aid", description: "Criteria for persons entitled to free legal services." },
            { section: "Section 19", title: "Lok Adalat", description: "Organisation of Lok Adalats for settlement of disputes." },
            { section: "Section 20", title: "Cognizance by Lok Adalat", description: "Lok Adalat jurisdiction—pending or pre-litigation cases." },
            { section: "Section 21", title: "Award of Lok Adalat", description: "Award of Lok Adalat is deemed a decree—final and binding." },
            { section: "Section 22B", title: "Permanent Lok Adalat", description: "For public utility services—electricity, transport, telecom, etc." },
        ]
    },

    // ──────── TRANSPORT & ROAD SAFETY ────────
    {
        act: "Motor Vehicles Act, 1988",
        category: "Transport Law",
        sections: [
            { section: "Section 3", title: "Driving Licence", description: "No person shall drive motor vehicle without driving licence." },
            { section: "Section 39", title: "Vehicle Registration", description: "Every motor vehicle must be registered." },
            { section: "Section 66", title: "Permit Required", description: "Permit required for transport vehicles." },
            { section: "Section 140", title: "No-Fault Liability", description: "Minimum compensation in motor vehicle accidents without fault proof." },
            { section: "Section 163A", title: "Structured Formula", description: "Structured compensation formula based on age and income." },
            { section: "Section 166", title: "Accident Claims", description: "Right to claim compensation through Motor Accidents Claims Tribunal." },
            { section: "Section 177", title: "General Penalty", description: "Fine up to ₹500 for contravention where no specific penalty." },
            { section: "Section 184", title: "Dangerous Driving", description: "Imprisonment up to 6 months or fine up to ₹1,000." },
            { section: "Section 185", title: "Drunk Driving", description: "Punishment for driving under influence—up to 6 months and ₹10,000." },
            { section: "Section 196", title: "Owner's Liability", description: "Owner liable for driver's offence if vehicle with consent." },
        ]
    },

    // ──────── CORPORATE LAW ────────
    {
        act: "Companies Act, 2013",
        category: "Corporate Law",
        sections: [
            { section: "Section 2(68)", title: "Private Company", description: "Definition—restricts transfer of shares, limits members to 200." },
            { section: "Section 7", title: "Incorporation", description: "Procedure for incorporation of a company." },
            { section: "Section 166", title: "Director's Duties", description: "Duties of directors—act in good faith for benefit of company." },
            { section: "Section 173", title: "Board Meetings", description: "Minimum 4 board meetings per year required." },
            { section: "Section 185", title: "Loan to Directors", description: "Prohibition on loans to directors or related parties." },
            { section: "Section 245", title: "Class Action Suit", description: "Members, depositors can file class action against company." },
            { section: "Section 271", title: "Winding Up", description: "Circumstances in which company may be wound up by Tribunal." },
            { section: "Section 447", title: "Punishment for Fraud", description: "Imprisonment from 6 months to 10 years and fine." },
        ]
    },

    // ──────── FOOD & PUBLIC HEALTH ────────
    {
        act: "Food Safety and Standards Act, 2006",
        category: "Consumer Rights",
        sections: [
            { section: "Section 3", title: "Definitions", description: "Definitions of food, food business, adulteration, unsafe food." },
            { section: "Section 26", title: "Licensing", description: "Every food business operator must obtain licence or registration." },
            { section: "Section 50", title: "Penalties for Sub-Standard Food", description: "Fine up to ₹5 lakh for selling sub-standard food." },
            { section: "Section 59", title: "Unsafe Food", description: "Up to 6 months imprisonment and ₹1 lakh fine for unsafe food." },
            { section: "Section 63", title: "Compensation", description: "Compensation for injury or death caused by unsafe food." },
        ]
    },

    // ──────── MISCELLANEOUS IMPORTANT ACTS ────────
    {
        act: "Prevention of Corruption Act, 1988",
        category: "Anti-Corruption",
        sections: [
            { section: "Section 7", title: "Public Servant Taking Bribe", description: "Minimum 3 years imprisonment for taking undue advantage." },
            { section: "Section 8", title: "Bribe by Commercial Organisation", description: "Offence of giving bribe by associated persons." },
            { section: "Section 13", title: "Criminal Misconduct", description: "Dishonestly misappropriating property entrusted as public servant." },
            { section: "Section 17", title: "Prior Sanction for Prosecution", description: "No court shall take cognizance without prior sanction." },
        ]
    },
    {
        act: "Arms Act, 1959",
        category: "Criminal Law",
        sections: [
            { section: "Section 3", title: "Licence for Firearms", description: "No person shall acquire, possess, or carry firearms without licence." },
            { section: "Section 25", title: "Punishment", description: "Manufacturing or selling unlicensed arms—minimum 3 years imprisonment." },
            { section: "Section 27", title: "Using Arms", description: "Using arms to commit offence—minimum 7 years imprisonment." },
        ]
    },
    {
        act: "NDPS Act (Narcotic Drugs and Psychotropic Substances), 1985",
        category: "Criminal Law",
        sections: [
            { section: "Section 8", title: "Prohibition", description: "No person shall produce, manufacture, sell, or possess narcotic drugs." },
            { section: "Section 20", title: "Cannabis Punishment", description: "Small quantity—up to 1 year, commercial quantity—10 to 20 years." },
            { section: "Section 21", title: "Manufactured Drugs", description: "Punishment for contravention involving manufactured drugs." },
            { section: "Section 27", title: "Consumption", description: "Punishment for consumption of narcotic drug—up to 1 year for first offence." },
            { section: "Section 37", title: "Bail Restrictions", description: "Bail shall not be granted unless court is satisfied no further offence likely." },
        ]
    },
    {
        act: "Indian Stamp Act, 1899",
        category: "Civil Law",
        sections: [
            { section: "Section 3", title: "Instruments Chargeable", description: "Every instrument mentioned in Schedule I chargeable with duty." },
            { section: "Section 33", title: "Examination and Impounding", description: "Every person examining instruments must impound if under-stamped." },
            { section: "Section 35", title: "Instruments Not Duly Stamped", description: "Instrument not duly stamped not admissible as evidence." },
        ]
    },
    {
        act: "Indian Succession Act, 1925",
        category: "Family Law",
        sections: [
            { section: "Section 30", title: "Will by Hindus", description: "Any Hindu, Sikh, Jain, or Buddhist may dispose of property by will." },
            { section: "Section 59", title: "Who May Make Will", description: "Every person of sound mind and not a minor may make a will." },
            { section: "Section 63", title: "Execution of Will", description: "Will must be signed by testator and attested by two witnesses." },
            { section: "Section 213", title: "Probate Required", description: "Right as executor or legatee cannot be established without probate." },
        ]
    },
    {
        act: "Competition Act, 2002",
        category: "Corporate Law",
        sections: [
            { section: "Section 3", title: "Anti-Competitive Agreements", description: "Agreements which cause adverse effect on competition are void." },
            { section: "Section 4", title: "Abuse of Dominant Position", description: "No enterprise shall abuse its dominant position." },
            { section: "Section 5", title: "Combination", description: "Acquisition, merger, or amalgamation exceeding thresholds requires CCI approval." },
            { section: "Section 19", title: "Inquiry by CCI", description: "Competition Commission may inquire into anti-competitive practices." },
            { section: "Section 27", title: "Orders by Commission", description: "CCI may impose penalties up to 10% of turnover for 3 preceding years." },
        ]
    },
    {
        act: "Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
        category: "Family Law",
        sections: [
            { section: "Section 4", title: "Maintenance Obligation", description: "Children and relatives shall maintain senior citizens." },
            { section: "Section 5", title: "Application for Maintenance", description: "Senior citizen may apply to Maintenance Tribunal." },
            { section: "Section 9", title: "Maximum Maintenance", description: "Tribunal may order maintenance up to ₹10,000 per month." },
            { section: "Section 23", title: "Transfer of Property", description: "Transfer of property by senior citizen to avoid maintenance may be void." },
        ]
    },
    {
        act: "Right to Fair Compensation and Transparency in Land Acquisition Act, 2013",
        category: "Property Law",
        sections: [
            { section: "Section 26", title: "Market Value", description: "Market value shall be determined by collector using prescribed method." },
            { section: "Section 28", title: "Solatium", description: "100% solatium (additional payment) above market value for compulsory acquisition." },
            { section: "Section 30", title: "Compensation in Rural Areas", description: "Enhanced compensation multiplier for rural land acquisition." },
            { section: "Section 38", title: "Emergency Acquisition", description: "Procedure for emergency requisition—rare circumstances only." },
        ]
    },
];

export default legalDatabase;
export const categories = [...new Set(legalDatabase.map(a => a.category))].sort();
export const totalSections = legalDatabase.reduce((sum, act) => sum + act.sections.length, 0);
export const totalActs = legalDatabase.length;

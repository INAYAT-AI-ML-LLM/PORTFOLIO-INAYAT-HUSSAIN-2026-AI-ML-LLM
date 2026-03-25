const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('public/resume.pdf'));

// Header
doc.fontSize(22).font('Helvetica-Bold').text('Mohammad Inayat Hussain', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(12).font('Helvetica').fillColor('#555555').text('Software Engineer | Full Stack & GenAI Specialist', { align: 'center' });
doc.text('+91 8595260860 | mohammadinayathussain5@gmail.com', { align: 'center' });
doc.text('LinkedIn: inayat-hussain-105a8834b | GitHub: github.com/Inayat-0007', { align: 'center' });
doc.moveDown(1.5);

// SUMMARY
doc.fillColor('black').fontSize(14).font('Helvetica-Bold').text('SUMMARY', { underline: true });
doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica').text('AI-focused Software Engineer and MCA candidate at LNCT. Specialized in integrating Generative AI (GenAI) and Large Language Models (LLMs) into scalable web applications. Recognized for urban innovation proposals and active leadership in technical seminars and high-stakes hackathons.', { align: 'justify' });
doc.moveDown(1);

// TECHNICAL SKILLS
doc.fontSize(14).font('Helvetica-Bold').text('TECHNICAL SKILLS', { underline: true });
doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica')
   .text('• AI & Automation: Generative AI, LLMs (Gemini 2.0 Flash), AI Agents, RAG, Query Expansion, n8n Automation.')
   .text('• Languages & Frameworks: Python, C/C++, JavaScript (ES6+), FastAPI, Node.js, Express.js, React, Redux.')
   .text('• Developer Tools: GitHub, Agile Methodology, VS Code, NumPy, Pandas, Linux, RESTful APIs.')
   .text('• Cloud & Database: MongoDB, SQL, Hardware-Software Integration, Security (Rate Limiting, XSS Sanitization).');
doc.moveDown(1);

// PROFESSIONAL EXPERIENCE
doc.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE', { underline: true });
doc.moveDown(0.3);
doc.fontSize(11).font('Helvetica-Bold').text('Web Developer | ATI Group of Technologies, Delhi, India');
doc.fontSize(10).font('Helvetica-Oblique').text('(06/2022 - 12/2022)');
doc.moveDown(0.2);
doc.font('Helvetica').text('• Engineered high-performance backend services and RESTful APIs for an Account Management system using Node.js.');
doc.text('• Collaborated in a cross-functional Agile environment to deliver secure full-stack features, optimizing client data availability.');
doc.moveDown(1);

// TECHNICAL PROJECTS
doc.fontSize(14).font('Helvetica-Bold').text('TECHNICAL PROJECTS', { underline: true });
doc.moveDown(0.3);
doc.fontSize(11).font('Helvetica-Bold').text('SHL Assessment Recommender | FastAPI, Gemini 2.0 Flash, Sentence-Transformers');
doc.fontSize(10).font('Helvetica-Oblique').text('March 2026');
doc.moveDown(0.2);
doc.font('Helvetica').text('• Developed a semantic recommendation engine utilizing all-MiniLM-L6-v2 and Gemini 2.0 Flash for query expansion.');
doc.text('• Integrated production-grade security including slowapi for rate limiting and bleach for XSS sanitization.');
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').text('Shield Ryzen V2 - AMD Chipset Inspire | C++, Hardware Optimization');
doc.fontSize(10).font('Helvetica-Oblique').text('2025');
doc.moveDown(0.2);
doc.font('Helvetica').text('• Developed a low-level performance utility for the AMD Slingshot Hackathon, optimized for Ryzen chipsets.');
doc.text('• Focused on hardware-software synergy to maximize CPU throughput and system-level processing efficiency.');
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').text('Jai K Bio Agritake Corporate Platform | MERN Stack, SaaS Architecture');
doc.fontSize(10).font('Helvetica-Oblique').text('01/2025 - 10/2025');
doc.moveDown(0.2);
doc.font('Helvetica').text('• Built and deployed a mobile-responsive SaaS platform for a bio-fertilizer company to manage organic product inventories.');
doc.text('• Implemented secure user authentication and customer-centric UI/UX design to drive digital business growth.');
doc.moveDown(1);

// EDUCATION
doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION', { underline: true });
doc.moveDown(0.3);
doc.fontSize(11).font('Helvetica-Bold').text('Lakshmi Narain College of Technology (LNCT), Bhopal, India');
doc.fontSize(10).font('Helvetica').text('Master of Computer Applications (MCA) | 10/2024 - Present');
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('Swami Vivekanand Institute of Technology, Balaghat, India');
doc.fontSize(10).font('Helvetica').text('Bachelor of Computer Applications (BCA) | 05/2020 - 05/2023');

doc.end();
console.log("PDF created successfully at public/resume.pdf!");

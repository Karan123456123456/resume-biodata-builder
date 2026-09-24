// Current category state
let currentCategory = 'indian';

// Category Switcher
function selectCategory(category) {
    currentCategory = category;

    // Reset active button styling
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'active');
        btn.classList.add('border-transparent');
    });

    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
        activeBtn.classList.add('border-blue-600', 'active');
    }

    // Toggle Form Groups & Preview Sections based on Category
    const isMarriage = category === 'marriage';
    const isForeign = category === 'foreign';
    const isTech = category === 'tech';

    // Form inputs toggle
    document.getElementById('group-photo').style.display = isForeign ? 'none' : 'block';
    document.getElementById('group-personal').style.display = isMarriage ? 'none' : 'block';
    document.getElementById('group-marriage').classList.toggle('hidden', !isMarriage);
    document.getElementById('group-declaration').style.display = isMarriage ? 'none' : 'block';

    // Preview sections toggle
    document.getElementById('p-photo').classList.toggle('hidden', isForeign);
    document.getElementById('p-sec-personal').classList.toggle('hidden', isMarriage);
    document.getElementById('p-sec-marriage').classList.toggle('hidden', !isMarriage);
    document.getElementById('p-sec-declaration').classList.toggle('hidden', isMarriage);

    // Dynamic Header Title for Marriage Biodata
    if (isMarriage) {
        document.getElementById('p-job-title').style.display = 'none';
    } else {
        document.getElementById('p-job-title').style.display = 'block';
    }

    updatePreview();
}

// Live Preview Update Function
function updatePreview() {
    const name = document.getElementById('name').value.trim() || 'YOUR FULL NAME';
    document.getElementById('p-name').innerText = name;
    document.getElementById('p-sign-name').innerText = name;

    const jobTitle = document.getElementById('job-title').value.trim() || 'Your Job Title / Professional Designation';
    document.getElementById('p-job-title').innerText = jobTitle;

    const phone = document.getElementById('phone').value.trim() || '+91 0000000000';
    const email = document.getElementById('email').value.trim() || 'your.email@example.com';
    const address = document.getElementById('address').value.trim() || 'City, State, Country';
    document.getElementById('p-contact').innerHTML = `Mobile: ${phone} | ${email}<br>Address: ${address}`;

    // Objective / Summary
    const objText = document.getElementById('objective').value.trim() || 'Your career objective or professional summary will appear here once you fill out the form...';
    document.getElementById('p-objective').innerText = objText;

    // Experience
    const expText = document.getElementById('experience').value.trim() || 'Company Name & Location\nYour Role / Position (Dates)\n- Key responsibility or achievement details...';
    document.getElementById('p-experience').innerText = expText;

    // Education
    const eduText = document.getElementById('education').value.trim() || 'Degree Name | Institute / Board | Year | Percentage/Grade';
    document.getElementById('p-education').innerText = eduText;

    // Certifications
    const certText = document.getElementById('certifications').value.trim() || 'Certification Name - Issuing Authority (Year)';
    document.getElementById('p-certifications').innerText = certText;

    // Skills
    const skillsText = document.getElementById('skills').value.trim() || 'Technical & Professional skills list...';
    document.getElementById('p-skills').innerText = skillsText;

    // Personal Details
    document.getElementById('p-dob').innerText = document.getElementById('dob').value.trim() || 'DD/MM/YYYY';
    document.getElementById('p-father').innerText = document.getElementById('father').value.trim() || "Father's Name";
    document.getElementById('p-language').innerText = document.getElementById('language').value.trim() || 'Languages Known';
    document.getElementById('p-marital').innerText = document.getElementById('marital').value.trim() || 'Status';

    // Marriage Details
    document.getElementById('p-caste').innerText = document.getElementById('caste').value.trim() || '-';
    document.getElementById('p-height').innerText = document.getElementById('height').value.trim() || '-';
    document.getElementById('p-family').innerText = document.getElementById('family').value.trim() || '-';

    // Declaration
    document.getElementById('p-place').innerText = document.getElementById('place').value.trim() || 'Your City';
    document.getElementById('p-date').innerText = document.getElementById('date').value.trim() || '__/__/____';
}

// Image Preview Handler
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('p-photo');
        output.src = reader.result;
        output.classList.remove('hidden');
    };
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

// Template Switcher
function changeTemplate(templateClass) {
    const container = document.getElementById('preview-container');
    container.className = `${templateClass} bg-white p-8 shadow-lg w-[595px] min-h-[842px] text-xs leading-relaxed text-gray-800`;
}

// Color Theme Switcher
function changeColor(colorCode) {
    const title = document.getElementById('p-name');
    if (title) {
        title.style.color = colorCode;
    }
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(el => {
        el.style.borderBottom = `2px solid ${colorCode}`;
        el.style.color = colorCode;
        el.style.fontWeight = 'bold';
        el.style.marginBottom = '6px';
        el.style.marginTop = '10px';
    });
}

// PDF Download Handler
function downloadPDF() {
    const element = document.getElementById('preview-container');
    const userName = document.getElementById('name').value.trim() || 'Resume';
    
    const opt = {
        margin:       0.3,
        filename:     `${userName.replace(/\s+/g, '_')}_Document.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

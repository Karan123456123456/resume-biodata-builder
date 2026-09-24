let currentCategory = 'indian';
let themeColor = '#1e40af';

function selectCategory(cat) {
    currentCategory = cat;

    // Toggle Button Styles
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active', 'border-blue-600'));
    document.getElementById(`btn-${cat}`).classList.add('active', 'border-blue-600');

    // Display Groups Logic
    const groupPhoto = document.getElementById('group-photo');
    const groupPersonal = document.getElementById('group-personal');
    const groupMarriage = document.getElementById('group-marriage');
    const groupDeclaration = document.getElementById('group-declaration');

    const pSecPersonal = document.getElementById('p-sec-personal');
    const pSecMarriage = document.getElementById('p-sec-marriage');
    const pSecDeclaration = document.getElementById('p-sec-declaration');
    const pPhoto = document.getElementById('p-photo');

    if (cat === 'indian') {
        groupPhoto.style.display = 'block';
        groupPersonal.style.display = 'block';
        groupMarriage.style.display = 'none';
        groupDeclaration.style.display = 'block';

        pSecPersonal.style.display = 'block';
        pSecMarriage.style.display = 'none';
        pSecDeclaration.style.display = 'block';
    } else if (cat === 'tech' || cat === 'foreign') {
        // Hide photos and personal details for ATS
        groupPhoto.style.display = 'none';
        groupPersonal.style.display = 'none';
        groupMarriage.style.display = 'none';
        groupDeclaration.style.display = 'none';

        pSecPersonal.style.display = 'none';
        pSecMarriage.style.display = 'none';
        pSecDeclaration.style.display = 'none';
        pPhoto.classList.add('hidden');
    } else if (cat === 'marriage') {
        groupPhoto.style.display = 'block';
        groupPersonal.style.display = 'block';
        groupMarriage.style.display = 'block';
        groupDeclaration.style.display = 'none';

        pSecPersonal.style.display = 'block';
        pSecMarriage.style.display = 'block';
        pSecDeclaration.style.display = 'none';
    }

    updatePreview();
}

function updatePreview() {
    const name = document.getElementById('name').value || 'KARAN KASHYAP';
    document.getElementById('p-name').innerText = name;
    document.getElementById('p-sign-name').innerText = name;
    document.getElementById('p-job-title').innerText = document.getElementById('job-title').value || 'Mechanic Motor Vehicle / Automobile Technician';
    
    const phone = document.getElementById('phone').value || '8115540448';
    const email = document.getElementById('email').value || 'karankashyap7246@gmail.com';
    const address = document.getElementById('address').value || 'Lucknow Uttar Pradesh';
    document.getElementById('p-contact').innerHTML = `Mobile: ${phone} | ${email}<br>Address: ${address}`;

    document.getElementById('p-objective').innerText = document.getElementById('objective').value || 'Skilled and certified ITI Mechanic Motor Vehicle with experience...';
    document.getElementById('p-experience').innerText = document.getElementById('experience').value || 'Maruti Suzuki India Limited...';
    document.getElementById('p-education').innerText = document.getElementById('education').value || 'Bachelor of Arts | CSJM University | 2023 | 77.67%';
    document.getElementById('p-certifications').innerText = document.getElementById('certifications').value || 'National Apprenticeship Certificate - MMV, DGT 2023';
    document.getElementById('p-skills').innerText = document.getElementById('skills').value || 'Technical: Vehicle Assembly, Engine Maintenance';

    // Personal & Marriage Updates
    document.getElementById('p-dob').innerText = document.getElementById('dob').value || '17 - Oct - 2002';
    document.getElementById('p-father').innerText = document.getElementById('father').value || 'Mr Ramesh Kashyap';
    document.getElementById('p-language').innerText = document.getElementById('language').value || 'Hindi, English';
    document.getElementById('p-marital').innerText = document.getElementById('marital').value || 'Unmarried';

    document.getElementById('p-caste').innerText = document.getElementById('caste').value || '-';
    document.getElementById('p-height').innerText = document.getElementById('height').value || '-';
    document.getElementById('p-family').innerText = document.getElementById('family').value || '-';

    document.getElementById('p-place').innerText = document.getElementById('place').value || 'Lucknow';
    document.getElementById('p-date').innerText = document.getElementById('date').value || '__/__/____';
}

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

function changeColor(color) {
    themeColor = color;
    document.getElementById('p-name').style.color = color;
    document.querySelectorAll('.section-title').forEach(el => {
        el.style.color = color;
        el.style.borderColor = color;
    });
}

function changeTemplate(temp) {
    const container = document.getElementById('preview-container');
    container.className = `${temp} bg-white p-8 shadow-lg w-[595px] min-h-[842px] text-xs leading-relaxed text-gray-800`;
    changeColor(themeColor);
}

function downloadPDF() {
    const element = document.getElementById('preview-container');
    const opt = {
        margin:       0.2,
        filename:     'Resume_Document.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

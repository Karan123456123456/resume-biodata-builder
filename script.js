let currentCategory = 'indian';
let themeColor = '#1e40af';

// Category Selector Logic
function selectCategory(cat) {
    currentCategory = cat;
    
    // UI Elements Toggle
    const photoGroup = document.getElementById('photo-group');
    const personalFields = document.getElementById('personal-fields');
    const previewExtra = document.getElementById('p-extra');
    const previewImg = document.getElementById('preview-img');

    if (cat === 'indian' || cat === 'marriage') {
        photoGroup.classList.remove('hidden');
        personalFields.classList.remove('hidden');
        previewExtra.classList.remove('hidden');
    } else {
        // Hide photo and extra fields for ATS Compliance (Tech/Foreign)
        photoGroup.classList.add('hidden');
        personalFields.classList.add('hidden');
        previewExtra.classList.add('hidden');
        previewImg.classList.add('hidden');
    }

    updatePreview();
}

// Live Text Update Logic
function updatePreview() {
    document.getElementById('p-name').innerText = document.getElementById('name').value || 'Your Name';
    document.getElementById('p-contact').innerText = document.getElementById('contact').value || 'Email & Contact Details';
    document.getElementById('p-dob').innerText = document.getElementById('dob').value || '-';
    document.getElementById('p-father').innerText = document.getElementById('father').value || '-';
    document.getElementById('p-education').innerText = document.getElementById('education').value || 'Education details will appear here...';
    document.getElementById('p-experience').innerText = document.getElementById('experience').value || 'Experience or details will appear here...';
}

// Image Preview
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('preview-img');
        output.src = reader.result;
        output.classList.remove('hidden');
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Live Theme Color Change
function changeColor(color) {
    themeColor = color;
    document.getElementById('p-name').style.color = color;
}

// High-Quality PDF Download Logic
function downloadPDF() {
    const element = document.getElementById('preview-container');
    const opt = {
        margin:       0.5,
        filename:     'Document.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

// Admin credentials
const ADMIN_USERNAME = 'ADMIN321';
const ADMIN_PASSWORD = 'WIFIPRIBADI321';

// Data storage
let konsumenDataList = [];
let currentAdminUser = null;
let currentKTPData = null;
let selectedKonsumenData = null;

// Initialize data from localStorage
window.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
});

// Storage Functions
function saveDataToStorage() {
    localStorage.setItem('konsumenData', JSON.stringify(konsumenDataList));
}

function loadDataFromStorage() {
    const stored = localStorage.getItem('konsumenData');
    if (stored) {
        konsumenDataList = JSON.parse(stored);
    }
}

// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

function showAdminLogin() {
    showPage('adminLogin');
    document.getElementById('loginError').textContent = '';
    document.getElementById('loginError').classList.remove('show');
    document.getElementById('adminName').value = '';
    document.getElementById('adminPassword').value = '';
}

function showKonsumenForm() {
    showPage('konsumenForm');
    document.getElementById('konsumenFormElement').reset();
    document.getElementById('konsumenSuccess').style.display = 'none';
}

function backToLanding() {
    showPage('landing');
}

// Admin Login Handler
function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminName').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        currentAdminUser = username;
        showAdminDashboard();
        errorDiv.textContent = '';
        errorDiv.classList.remove('show');
    } else {
        errorDiv.textContent = '❌ Nama atau password salah!';
        errorDiv.classList.add('show');
    }
}

// Konsumen Form Handler
function handleKonsumenSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('konsumenName').value.trim();
    const phone = document.getElementById('konsumenPhone').value.trim();
    const address = document.getElementById('konsumenAddress').value.trim();
    const packages = document.getElementById('konsumenPackage').value;
    const ktpFile = document.getElementById('konsumenKTP').files[0];

    // Validate phone number
    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
        alert('Nomor HP tidak valid. Silakan masukkan nomor HP yang benar.');
        return;
    }

    // Convert image to base64
    if (ktpFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const konsumenData = {
                id: Date.now(),
                name: name,
                phone: phone,
                address: address,
                package: packages,
                ktpImage: e.target.result,
                status: 'Pending',
                timestamp: new Date().toLocaleString('id-ID')
            };

            konsumenDataList.push(konsumenData);
            saveDataToStorage();

            // Reset form
            document.getElementById('konsumenFormElement').reset();
            document.getElementById('konsumenSuccess').style.display = 'block';

            // Hide success message after 3 seconds
            setTimeout(() => {
                document.getElementById('konsumenSuccess').style.display = 'none';
            }, 3000);

            // Back to landing after 2 seconds
            setTimeout(() => {
                backToLanding();
            }, 2000);
        };
        reader.readAsDataURL(ktpFile);
    }
}

// Admin Dashboard
function showAdminDashboard() {
    showPage('adminDashboard');
    document.getElementById('adminUsername').textContent = currentAdminUser;
    updateAdminTable();
    setDefaultTanggal();
}

function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-active');
    });
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    // Add active class to clicked button
    event.target.classList.add('tab-active');
}

function populateKonsumenSelect() {
    const select = document.getElementById('strukPilihKonsumen');
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">-- Pilih Konsumen --</option>';
    
    konsumenDataList.forEach(data => {
        const option = document.createElement('option');
        option.value = data.id;
        option.textContent = `${data.name} (${data.phone})`;
        select.appendChild(option);
    });
    
    select.value = currentValue;
}

function cariKonsumen() {
    const keyword = document.getElementById('strukCariKonsumen').value.toLowerCase().trim();
    const dropdown = document.getElementById('daftarKonsumenDropdown');
    
    if (!keyword) {
        dropdown.style.display = 'none';
        return;
    }
    
    const hasil = konsumenDataList.filter(data => 
        data.name.toLowerCase().includes(keyword) || 
        data.phone.includes(keyword)
    );
    
    if (hasil.length === 0) {
        dropdown.innerHTML = '<div style="padding: 15px; text-align: center; color: #999;">Konsumen tidak ditemukan</div>';
        dropdown.style.display = 'block';
        return;
    }
    
    dropdown.innerHTML = hasil.map(data => `
        <div class="konsumen-item" onclick="selectKonsumen(${data.id})">
            <div class="konsumen-item-nama">${data.name}</div>
            <div class="konsumen-item-phone">📱 ${data.phone}</div>
            <div class="konsumen-item-alamat">📍 ${data.address}</div>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
}

function selectKonsumen(konsumenId) {
    const konsumen = konsumenDataList.find(d => d.id === konsumenId);
    if (!konsumen) return;
    
    selectedKonsumenData = konsumen;
    
    // Update search input
    document.getElementById('strukCariKonsumen').value = konsumen.name;
    
    // Hide dropdown
    document.getElementById('daftarKonsumenDropdown').style.display = 'none';
    
    // Show data konsumen terpilih
    document.getElementById('dataKonsumenTerpilih').style.display = 'block';
    document.getElementById('dataKonsumenNama').textContent = konsumen.name;
    document.getElementById('dataKonsumenPhone').textContent = konsumen.phone;
    document.getElementById('dataKonsumenAlamat').textContent = konsumen.address;
    document.getElementById('dataKonsumenPacket').textContent = konsumen.package;
}

function resetPilihKonsumen() {
    selectedKonsumenData = null;
    document.getElementById('strukCariKonsumen').value = '';
    document.getElementById('daftarKonsumenDropdown').style.display = 'none';
    document.getElementById('dataKonsumenTerpilih').style.display = 'none';
    document.getElementById('strukCariKonsumen').focus();
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    const wrapper = document.querySelector('.search-konsumen-wrapper');
    if (wrapper && !wrapper.contains(event.target)) {
        document.getElementById('daftarKonsumenDropdown').style.display = 'none';
    }
});

function setDefaultTanggal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('strukTanggal').value = today;
}

// Format Rupiah function
function formatRupiah(angka) {
    if (!angka || angka === 0 || angka === '0') return 'Rp 0';
    
    // Convert to string and reverse for processing
    const angkaString = angka.toString();
    const reversed = angkaString.split('').reverse();
    let hasil = '';
    
    // Add dot every 3 digits
    for (let i = 0; i < reversed.length; i++) {
        if (i > 0 && i % 3 === 0) {
            hasil = '.' + hasil;
        }
        hasil = reversed[i] + hasil;
    }
    
    return 'Rp ' + hasil;
}

function loadDataKonsumenToStruk() {
    const selectedId = document.getElementById('strukPilihKonsumen').value;
    if (!selectedId) return;
    
    const selected = konsumenDataList.find(d => d.id == selectedId);
    if (selected) {
        // Data will be used in preview
        return selected;
    }
}

function updatePreviewStrukSementara() {
    const nominalBayarInput = document.getElementById('strukNominalBayar').value;
    const nominalBayar = parseInt(nominalBayarInput) || 0;
    if (nominalBayar > 0) {
        document.getElementById('previewNominal').textContent = formatRupiah(nominalBayar);
    } else {
        document.getElementById('previewNominal').textContent = 'Rp 0';
    }
}

function handleBuatStruk(event) {
    event.preventDefault();
    
    if (!selectedKonsumenData) {
        alert('Silakan pilih konsumen terlebih dahulu!');
        return;
    }
    
    const namaAdmin = document.getElementById('strukNamaAdmin').value.trim();
    const tanggal = document.getElementById('strukTanggal').value;
    const nominalBayarInput = document.getElementById('strukNominalBayar').value;
    const nominalBayar = parseInt(nominalBayarInput) || 0;
    const metodeBayar = document.getElementById('strukMetodeBayar').value;
    const catatan = document.getElementById('strukCatatan').value.trim();
    
    if (!namaAdmin || !tanggal || !nominalBayar || !metodeBayar) {
        alert('Silakan isi semua field yang wajib!');
        return;
    }
    
    // Generate preview
    generateStrukPreview(selectedKonsumenData, namaAdmin, tanggal, nominalBayar, metodeBayar, catatan);
    
    // Show preview container
    document.querySelector('.struk-form').style.display = 'none';
    document.getElementById('strukPreviewContainer').style.display = 'block';
}

function generateStrukPreview(konsumen, namaAdmin, tanggal, nominalBayar, metodeBayar, catatan) {
    const tanggalObj = new Date(tanggal);
    const tanggalFormat = tanggalObj.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const nominalFormatted = formatRupiah(nominalBayar);
    
    const strukHTML = `
        <div class="struk-header">
            <h4>🌐 WIFIPRIBADI</h4>
            <p>Internet Berkualitas Untuk Rumah Anda</p>
        </div>
        
        <div class="struk-divider"></div>
        
        <div class="struk-content">
            <div class="struk-item">
                <span class="struk-item-name">STRUK PEMBAYARAN</span>
                <span class="struk-item-value"></span>
            </div>
            
            <div class="struk-divider"></div>
            
            <div class="struk-item">
                <span class="struk-item-name">Nama Konsumen:</span>
                <span class="struk-item-value">${konsumen.name}</span>
            </div>
            <div class="struk-item">
                <span class="struk-item-name">Nomor HP:</span>
                <span class="struk-item-value">${konsumen.phone}</span>
            </div>
            <div class="struk-item">
                <span class="struk-item-name">Alamat:</span>
                <span class="struk-item-value"></span>
            </div>
            <div style="margin: 5px 0; word-break: break-word; font-size: 0.9em;">
                ${konsumen.address}
            </div>
            <div class="struk-item" style="margin-top: 10px;">
                <span class="struk-item-name">Paket:</span>
                <span class="struk-item-value">${konsumen.package}</span>
            </div>
            
            <div class="struk-divider"></div>
            
            <div class="struk-item">
                <span class="struk-item-name">Tanggal:</span>
                <span class="struk-item-value">${tanggalFormat}</span>
            </div>
            <div class="struk-item">
                <span class="struk-item-name">Metode Bayar:</span>
                <span class="struk-item-value">${metodeBayar}</span>
            </div>
            
            <div class="struk-divider"></div>
            
            <div class="struk-total">
                <span>TOTAL BAYAR</span>
                <span>${nominalFormatted}</span>
            </div>
            
            ${catatan ? `<div class="struk-item" style="margin-top: 15px;">
                <span class="struk-item-name">Catatan:</span>
            </div>
            <div style="font-size: 0.9em; margin: 5px 0; word-break: break-word;">
                ${catatan}
            </div>` : ''}
            
            <div class="struk-divider"></div>
            
            <div class="struk-item">
                <span class="struk-item-name">Admin:</span>
                <span class="struk-item-value">${namaAdmin}</span>
            </div>
            <div class="struk-item">
                <span class="struk-item-name">Waktu:</span>
                <span class="struk-item-value">${new Date().toLocaleTimeString('id-ID')}</span>
            </div>
        </div>
        
        <div class="struk-footer">
            <p>Terima kasih telah menggunakan layanan kami!</p>
            <p>Simpan struk ini sebagai bukti pembayaran Anda</p>
            <p style="margin-top: 10px; font-size: 0.8em;">© 2026 WIFIPRIBADI - ${new Date().getFullYear()}</p>
        </div>
    `;
    
    document.getElementById('strukPreview').innerHTML = strukHTML;
}

function cetakStrukPNG() {
    const element = document.getElementById('strukPreview');
    
    html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `Struk_${selectedKonsumenData.name.replace(/\s+/g, '_')}_${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        console.error('Error generating PNG:', err);
        alert('Gagal membuat gambar struk. Silakan coba lagi.');
    });
}

function resetFormStruk() {
    document.getElementById('strukNamaAdmin').value = '';
    selectedKonsumenData = null;
    document.getElementById('strukCariKonsumen').value = '';
    document.getElementById('strukNamaAdmin').value = '';
    document.getElementById('strukNominalBayar').value = '';
    document.getElementById('strukMetodeBayar').value = '';
    document.getElementById('strukCatatan').value = '';
    document.getElementById('dataKonsumenTerpilih').style.display = 'none';
    document.getElementById('daftarKonsumenDropdown').style.display = 'none';
    setDefaultTanggal();
    
    document.querySelector('.struk-form').style.display = 'block';
    document.getElementById('strukPreviewContainer').style.display = 'none';
}

function updateAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    
    if (konsumenDataList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="no-data">Belum ada data konsumen</td></tr>';
        return;
    }

    tableBody.innerHTML = konsumenDataList.map((data, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${data.name}</strong></td>
            <td>${data.phone}</td>
            <td>${data.address}</td>
            <td>${data.package}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewKTP(${data.id})">👁️ Lihat</button>
            </td>
            <td>
                <span class="status-badge ${data.status === 'Pemrosesan' ? 'status-processed' : 'status-pending'}">
                    ${data.status}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 5px;">
                    ${data.status === 'Pending' ? 
                        `<button class="btn-action btn-check" onclick="processData(${data.id})">✓ Proses</button>` :
                        `<button class="btn-action btn-check" style="opacity:0.5; cursor:not-allowed;" disabled>✓ Sudah Diproses</button>`
                    }
                    <button class="btn-action btn-delete" onclick="deleteData(${data.id})">🗑️ Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function processData(dataId) {
    const dataIndex = konsumenDataList.findIndex(d => d.id === dataId);
    if (dataIndex !== -1) {
        // Toggle status
        if (konsumenDataList[dataIndex].status === 'Pending') {
            konsumenDataList[dataIndex].status = 'Pemrosesan';
        } else {
            konsumenDataList[dataIndex].status = 'Pending';
        }
        saveDataToStorage();
        updateAdminTable();
    }
}

function deleteData(dataId) {
    const data = konsumenDataList.find(d => d.id === dataId);
    if (!data) return;
    
    if (confirm(`Apakah Anda yakin ingin menghapus data konsumen "${data.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
        const dataIndex = konsumenDataList.findIndex(d => d.id === dataId);
        if (dataIndex !== -1) {
            konsumenDataList.splice(dataIndex, 1);
            saveDataToStorage();
            updateAdminTable();
            alert('✓ Data konsumen berhasil dihapus');
        }
    }
}

function viewKTP(dataId) {
    const data = konsumenDataList.find(d => d.id === parseInt(dataId) || d.id === dataId);
    if (data) {
        currentKTPData = data;
        const modal = document.getElementById('ktpModal');
        const preview = document.getElementById('ktpPreview');
        
        preview.src = data.ktpImage;
        document.getElementById('ktpModalName').textContent = data.name;
        document.getElementById('ktpModalPhone').textContent = data.phone;
        document.getElementById('ktpModalAddress').textContent = data.address;
        document.getElementById('ktpModalPackage').textContent = data.package;
        document.getElementById('ktpModalStatus').textContent = data.status;
        
        modal.classList.add('show');
    }
}

function downloadKTP() {
    if (!currentKTPData) return;
    
    const link = document.createElement('a');
    link.href = currentKTPData.ktpImage;
    link.download = `KTP_${currentKTPData.name.replace(/\s+/g, '_')}_${currentKTPData.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function closeKTPModal() {
    document.getElementById('ktpModal').classList.remove('show');
}

// Logout
function handleLogout() {
    currentAdminUser = null;
    konsumenDataList = [];
    loadDataFromStorage();
    backToLanding();
    alert('Anda telah logout');
}

// Close modal when clicking outside image
window.addEventListener('click', (event) => {
    const modal = document.getElementById('ktpModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Real-time update for admin dashboard
setInterval(() => {
    if (currentAdminUser && document.getElementById('adminDashboard').classList.contains('active')) {
        loadDataFromStorage();
        updateAdminTable();
    }
}, 2000); // Update every 2 seconds

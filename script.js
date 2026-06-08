// Database Menu Baru dengan "category"
const products = [
    { id: 1, name: "Ayam Bakar Madu", price: 35000, category: "makanan", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=200&fit=crop" },
    { id: 2, name: "Nasi Goreng Spesial", price: 28000, category: "makanan", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&h=200&fit=crop" },
    { id: 3, name: "Sate Ayam Madura", price: 30000, category: "makanan", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop" },
    { id: 4, name: "Gurame Asam Manis", price: 65000, category: "makanan", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=300&h=200&fit=crop" },
    { id: 5, name: "Beef Burger", price: 45000, category: "makanan", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop" },
    { id: 6, name: "Pasta Carbonara", price: 40000, category: "makanan", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop" },
    { id: 7, name: "Es Teh Manis", price: 8000, category: "minuman", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop" },
    { id: 8, name: "Es Jeruk Peras", price: 12000, category: "minuman", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop" },
    { id: 9, name: "Kopi Susu Aren", price: 22000, category: "minuman", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop" },
    { id: 10, name: "Matcha Latte", price: 25000, category: "minuman", image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=300&h=200&fit=crop" },
    { id: 11, name: "Puding Coklat", price: 15000, category: "dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop" },
    { id: 12, name: "Croissant", price: 20000, category: "dessert", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop" }
];

let cart = [];
let subtotal = 0, ppn = 0, grandTotal = 0;
let riwayatTransaksi = [];
let sedangLihatHistory = false;

function login() {
    const user = document.getElementById('login-user').value;
    const pin = document.getElementById('login-pin').value;
    if (user.trim() === '') return alert("Nama Kasir tidak boleh kosong!");

    if (pin === '1234') {
        document.getElementById('kasir-name').innerText = `👨‍🍳 Kasir: ${user}`;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        renderProducts(); 
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

function gantiTab(tabName) {
    document.getElementById('tab-pos').classList.remove('active');
    document.getElementById('tab-dashboard').classList.remove('active');
    document.getElementById('pos-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');

    if(tabName === 'pos') {
        document.getElementById('tab-pos').classList.add('active');
        document.getElementById('pos-view').classList.remove('hidden');
    } else if(tabName === 'dashboard') {
        document.getElementById('tab-dashboard').classList.add('active');
        document.getElementById('dashboard-view').classList.remove('hidden');
        updateDashboard(); 
    }
}

function filterMenu(kategori, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    if (kategori === 'semua') {
        renderProducts(products);
    } else {
        renderProducts(products.filter(p => p.category === kategori));
    }
}

function renderProducts(dataToRender = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 
    dataToRender.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="addToCart(${product.id})">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">🛒 Tambah</button>
            </div>
        `;
        productList.appendChild(div);
    });
}

function aturTipePesanan() {
    const tipe = document.getElementById('order-type').value;
    document.getElementById('customer-info').placeholder = tipe === 'Dine-In' ? "No. Meja (Contoh: 12)" : "Nama Pelanggan (Contoh: Budi)";
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        kalkulasiTotal();
        setTimeout(() => {
            const wrapper = document.querySelector('.cart-items-wrapper');
            wrapper.scrollTop = wrapper.scrollHeight;
        }, 50);
    }
}

function hapusItem(index) {
    cart.splice(index, 1);
    kalkulasiTotal();
}

function kalkulasiTotal() {
    subtotal = 0;
    cart.forEach(item => subtotal += item.price);
    ppn = subtotal * 0.11;
    grandTotal = subtotal + ppn;
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
            <button class="btn-delete" onclick="hapusItem(${index})">✖ Hapus</button>
        `;
        cartItems.appendChild(li);
    });
    document.getElementById('subtotal-price').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('tax-price').innerText = `Rp ${ppn.toLocaleString('id-ID')}`;
    document.getElementById('total-price').innerText = `Rp ${grandTotal.toLocaleString('id-ID')}`;
}

function aturMetodeBayar() {
    const metode = document.getElementById('payment-method').value;
    const cashInputGroup = document.getElementById('cash-input-group');
    if (metode === 'Cash') {
        cashInputGroup.classList.remove('hidden');
    } else {
        cashInputGroup.classList.add('hidden');
    }
}

function formatRupiah(input) {
    let angka = input.value.replace(/[^,\d]/g, '').toString();
    let split = angka.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    input.value = rupiah;
}

function prosesBayar() {
    if (cart.length === 0) return alert("Keranjang belanja masih kosong!");

    const tipePesanan = document.getElementById('order-type').value;
    let infoPelanggan = document.getElementById('customer-info').value || "Tanpa Nama/Meja";
    const metode = document.getElementById('payment-method').value;
    let uangDiterima = 0;
    let kembalian = 0;

    if (metode === 'Cash') {
        let inputUang = document.getElementById('cash-amount').value;
        uangDiterima = parseInt(inputUang.replace(/\./g, ''));
        
        if (isNaN(uangDiterima) || uangDiterima < grandTotal) {
            return alert("Maaf, uang pelanggan tidak cukup atau input tidak valid!");
        }
        kembalian = uangDiterima - grandTotal;
    }

    const waktuSekarang = new Date().toLocaleString('id-ID');
    const idTransaksi = "TRX-" + (1000 + riwayatTransaksi.length + 1);
    
    riwayatTransaksi.push({
        id: idTransaksi,
        tanggal: waktuSekarang,
        tipe: tipePesanan,
        info: infoPelanggan,
        items: [...cart], 
        subtotal: subtotal,
        ppn: ppn,
        total: grandTotal,
        metode: metode,
        uangDiterima: uangDiterima,
        kembalian: kembalian
    });

    sedangLihatHistory = false; 
    tampilkanModalStruk(riwayatTransaksi[riwayatTransaksi.length - 1]);
    updateDashboard(); 
}

function tampilkanModalStruk(trx) {
    document.getElementById('struk-id').innerText = `ID  : ${trx.id}`;
    document.getElementById('struk-tanggal').innerText = `TGL : ${trx.tanggal}`;
    document.getElementById('struk-metode').innerText = `TIPE: ${trx.metode.toUpperCase()}`;
    
    const labelInfo = trx.tipe === 'Dine-In' ? 'Meja' : 'Nama';
    document.getElementById('struk-pelanggan').innerText = `${trx.tipe.toUpperCase()} - ${labelInfo}: ${trx.info}`;
    
    const strukItems = document.getElementById('struk-items');
    strukItems.innerHTML = '';
    trx.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span><span>${item.price.toLocaleString('id-ID')}</span>`;
        strukItems.appendChild(li);
    });
    
    document.getElementById('struk-subtotal').innerText = `Rp ${trx.subtotal.toLocaleString('id-ID')}`;
    document.getElementById('struk-ppn').innerText = `Rp ${trx.ppn.toLocaleString('id-ID')}`;
    document.getElementById('struk-total').innerHTML = `<span>TOTAL:</span> <span>Rp ${trx.total.toLocaleString('id-ID')}</span>`;

    const cashArea = document.getElementById('struk-cash-area');
    const qrisArea = document.getElementById('struk-qris-area');

    if (trx.metode === 'Cash') {
        cashArea.classList.remove('hidden'); qrisArea.classList.add('hidden');
        document.getElementById('struk-bayar').innerText = `Rp ${trx.uangDiterima.toLocaleString('id-ID')}`;
        document.getElementById('struk-kembali').innerText = `Rp ${trx.kembalian.toLocaleString('id-ID')}`;
    } else if (trx.metode === 'QRIS') {
        cashArea.classList.add('hidden'); qrisArea.classList.remove('hidden');
        const simulasiURL = encodeURIComponent(`https://mock-payment.com/pay?id=${trx.id}&amount=${trx.total}`);
        document.getElementById('qris-barcode').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${simulasiURL}`;
    } else {
        cashArea.classList.add('hidden'); qrisArea.classList.add('hidden');
    }

    document.getElementById('struk-modal').classList.remove('hidden');
}

// INI FUNGSI CETAK GHOST WINDOW-NYA (YANG SUDAH DIPERBAIKI)
function cetakStruk() {
    const printContent = document.getElementById('print-area').innerHTML;
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    
    printWindow.document.write('<html><head><title>Cetak Struk</title>');
    printWindow.document.write('<style>');
    
    // PERBAIKAN: Tambahkan aturan .hidden di sini biar yang gak kepakai ikut ngumpet!
    printWindow.document.write(`
        .hidden { display: none !important; }
        
        body { font-family: "Courier New", Courier, monospace; font-size: 14px; color: black; background: white; padding: 10px; margin: 0; }
        .struk-header { text-align: center; margin-bottom: 15px; }
        .struk-header h2 { margin: 0; font-size: 22px; }
        .struk-text { margin: 3px 0; }
        .font-bold { font-weight: bold; }
        .struk-flex { display: flex; justify-content: space-between; margin: 3px 0; font-weight: bold; }
        .struk-list { list-style: none; padding: 0; margin: 10px 0; border-top: 1px dashed black; border-bottom: 1px dashed black; padding: 10px 0; }
        .struk-list li { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .struk-total-text { display: flex; justify-content: space-between; border-top: 2px solid black; padding-top: 10px; margin: 10px 0; font-size: 16px; font-weight: bold; }
        .text-center { text-align: center; }
        .struk-footer { text-align: center; margin-top: 20px; font-style: italic; }
        img { max-width: 150px; display: block; margin: 10px auto; border: 2px solid black; }
    `);
    
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

function tutupStruk() {
    document.getElementById('struk-modal').classList.add('hidden');
    if (!sedangLihatHistory) {
        cart = []; subtotal = 0; ppn = 0; grandTotal = 0;
        document.getElementById('cash-amount').value = ''; 
        document.getElementById('customer-info').value = ''; 
        updateCartUI();
    }
}

function lihatStrukLama(id) {
    const trx = riwayatTransaksi.find(t => t.id === id);
    if (trx) {
        sedangLihatHistory = true; 
        tampilkanModalStruk(trx);
    }
}

function updateDashboard() {
    let totalPendapatan = 0;
    riwayatTransaksi.forEach(trx => { totalPendapatan += trx.total; });
    let avg = riwayatTransaksi.length > 0 ? totalPendapatan / riwayatTransaksi.length : 0;

    document.getElementById('dash-revenue').innerText = `Rp ${totalPendapatan.toLocaleString('id-ID')}`;
    document.getElementById('dash-trx-count').innerText = riwayatTransaksi.length;
    document.getElementById('dash-avg').innerText = `Rp ${Math.round(avg).toLocaleString('id-ID')}`;

    const tableBody = document.getElementById('dash-table-body');
    tableBody.innerHTML = '';
    
    [...riwayatTransaksi].reverse().forEach(trx => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${trx.id}</strong></td>
            <td>${trx.tanggal}</td>
            <td>${trx.tipe} - ${trx.info}</td>
            <td>${trx.metode}</td>
            <td><strong>Rp ${trx.total.toLocaleString('id-ID')}</strong></td>
            <td><button class="btn-sm-view" onclick="lihatStrukLama('${trx.id}')">👁️ Lihat</button></td>
        `;
        tableBody.appendChild(tr);
    });
}
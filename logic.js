const checks = [
    { id: 0, test: p => p.length >= 8 },
    { id: 1, test: p => /[A-Z]/.test(p) },
    { id: 2, test: p => /[a-z]/.test(p) },
    { id: 3, test: p => /[0-9]/.test(p) },
    { id: 4, test: p => /[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/.test(p) },
];

const segColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
const strengthLabels = ['Awaiting input', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

function checkPassword() {
    const pw = document.getElementById('password').value;
    let score = 0;

    checks.forEach(c => {
        const ok = pw.length > 0 && c.test(pw);
        document.getElementById('chip' + c.id).classList.toggle('pass', ok);
        if (ok) score++;
    });

    for (let i = 0; i < 5; i++) {
        document.getElementById('seg' + i).style.background =
            i < score && pw.length > 0 ? segColors[score - 1] : '#1e2130';
    }

    document.getElementById('statusLabel').textContent =
        pw.length === 0 ? 'Awaiting input' : strengthLabels[score];
}

function toggleVisibility() {
    const input = document.getElementById('password');
    const btn = document.getElementById('toggleBtn');
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="ti ti-eye-off"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i class="ti ti-eye"></i>';
    }
}

function copyPassword() {
    const val = document.getElementById('password').value;
    if (val) {
        navigator.clipboard.writeText(val).catch(() => { });
    }
}

function generatePassword() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const spec = '!@#$%^&*()-_=+[]{}';
    const all = upper + lower + nums + spec;

    let pw = [
        upper[Math.floor(Math.random() * upper.length)],
        lower[Math.floor(Math.random() * lower.length)],
        nums[Math.floor(Math.random() * nums.length)],
        spec[Math.floor(Math.random() * spec.length)],
    ];

    for (let i = 4; i < 14; i++) {
        pw.push(all[Math.floor(Math.random() * all.length)]);
    }

    pw = pw.sort(() => Math.random() - 0.5).join('');
    document.getElementById('password').value = pw;
    checkPassword();
}

function resetAll() {
    const input = document.getElementById('password');
    input.value = '';
    input.type = 'password';
    document.getElementById('toggleBtn').innerHTML = '<i class="ti ti-eye"></i>';
    checkPassword();
}
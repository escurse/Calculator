const $form = document.getElementById('form');
const $text = $form.querySelector('.text');
$form.onsubmit = (e) => {
    e.preventDefault();
    const $a = $form['a'];
    const $b = $form['b'];
    const $op = $form['op'];
    const aVal = $a.value;
    const bVal = $b.value;
    const opVal = $op.value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert('요청을 전송하지 못하였다.');
            return;
        }
        const response = JSON.parse(xhr.responseText);
        if (response['result'] === 'failure') {
            $text.classList.add('--warning');
            $text.innerText = '계산하지 못하였습니다.'
        } else {
            $text.classList.remove('--warning');
            $text.innerText = response['answer'];
        }
    }
    const url = new URL(`http://192.168.4.252:8080/api/calc`);
    url.searchParams.set('a', `${aVal}`);
    url.searchParams.set('b', `${bVal}`);
    url.searchParams.set('op', `${opVal}`);
    xhr.open('GET', url.toString());
    xhr.send();
    $a.value = '';
    $b.value = '';
};

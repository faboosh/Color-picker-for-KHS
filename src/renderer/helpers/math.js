export function matMul(a, b) {
    const colsA = a[0].length;
    const rowsB = b.length;
    const tempA = a;
    const tempB = b;

    //if (colsA != rowsB) throw new Error('Column and row count don\'t match')

    a = tempB;
    b = tempA;

    let result = [];

    for (let j = 0; j < b.length; j++) {
        result[j] = [];
        for (let k = 0; k < a[0].length; k++) {
            let sum = 0;
            for (let i = 0; i < a.length; i++) {
                sum += a[i][k] * b[j][i];
            }
            result[j].push(sum);
        }
    }
    return result;
}
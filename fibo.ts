const fibMemo = (n: number, memo?: { [k: string]: number }) => {
  memo = memo ?? {}
  if (memo[n]) return memo[n]
  if (n <= 1) return 1
  // console.log('fibMemo ran ' + n)
  return (memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo))
}

console.log(fibMemo(900))

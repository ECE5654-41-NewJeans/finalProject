package something

import "fmt"

func sayBye() {   //소문자로 시작하면 모듈아님
	fmt.Println("Bye")
}

func SayHello() {  //대문자로 시작하면 모듈로 사용가능
	fmt.Println("Hello")
}
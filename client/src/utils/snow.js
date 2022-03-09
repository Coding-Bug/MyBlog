export default function(){
    // 创建雪花
    let flakes =[]
    let flakeCount = 50

    // 鼠标位置
    let mX = -100   
    let mY = -100    
    // 创建画布
    let canvas = document.getElementById("Snow")
    let ctx = canvas.getContext("2d")

    let width = window.innerWidth
    let height = window.innerHeight
    // 一定要注意把canvas赋值
    canvas.width = width
    canvas.height=height

    
    // 创建飘雪函数
    function snow(){
        ctx.clearRect(0,0,width,height)
           // 对每一片雪花进行处理
        for(let  i = 0;i<flakes.length;++i){
            let flake = flakes[i]
            let xs = mX
            let ys = mY
            let minDist = 150 // 最小移动距离
            let xn = flake.x
            let yn = flake.y
            // 计算当前雪花距离鼠标的位置
            let dist = Math.sqrt((xn-xs)*(xn-xs)+(yn-ys)*(yn-ys))

            // 如果距离鼠标近，那就离开鼠标
            if(dist<minDist){
                let force = minDist /(dist*dist)
                let deltaV = force/2
                let xComp = (xs-xn)/dist
                let yComp = (ys-yn)/dist
                // 计算本次移动的距离
                flake.velX -=deltaV*xComp
                flake.velY -= deltaV*yComp 
            }else{  // 如果移动距离超过了最小移动距离
                flake.velX*=.98   // x方向速度减少
                if(flake.velY<=flake.speed){
                    flake.velY=flake.speed
                }
                flake.velX+=Math.cos(flake.step+=.05)*flake.stepSize
            }

            ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`
            flake.y += flake.velY
            flake.x += flake.velX

            // 雪花飘出屏幕后重撒
            if(flake.y>canvas.height||flake.y<0){
                resetFlake(flake)
            }
            if(flake.x>=canvas.width||flake.x<=0){
                resetFlake(flake)
            }

            ctx.beginPath() // 开启新路径
           
            ctx.arc(flake.x,flake.y,flake.size,0,Math.PI*2) // 创建圆
            ctx.fill()      
        }
        // 将绘制放入动画
        requestAnimationFrame(snow)
    }

    // 重置雪花的函数
    function resetFlake(flake){
        flake.x = Math.floor(Math.random()*canvas.width)
        flake.y = 0
        flake.size = (Math.random()*3)+2
        flake.speed = (Math.random()*1)+0.5
        flake.velX = 0
        flake.velY = flake.speed 
        flake.opacity = (Math.random()*0.5)+0.3
    }

    // 生成雪花
    function initFlake(flakes){
        for(let i = 0;i<flakeCount;++i){
            let x = Math.floor(Math.random()*canvas.width)
            let y = Math.floor(Math.random()*canvas.height)
            let size = (Math.random() * 3) + 2
            let speed = (Math.random() * 1) + 0.5
            let opacity = (Math.random() * 0.5) + 0.3
            flakes.push({
                speed:speed,
                velX:0,
                velY:speed,
                x:x,
                y:y,
                size:size,
                stepSize:(Math.random()) / 30 * 1,
                step:0,
                opacity:opacity
            })
        }
        //下雪
        snow()
    }

    // 对鼠标移动和窗口改变监听
    document.addEventListener("mousemove",function(e){
        mX = e.clientX
        mY=e.clientY
    })

    window.addEventListener('resize',function(){
        width = this.window.innerWidth
        height = this.window.innerHeight
        canvas.width = width
        canvas.height=height
    })
    initFlake(flakes)

    
  
}
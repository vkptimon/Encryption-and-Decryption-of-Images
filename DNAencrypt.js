const { blue, green } = require("color-name")
const { size } = require("lodash")

//Lorenz paramters and initial conditions
a, b, c = 10, 2.667, 28
x0, y0, z0 = 0, 0, 0

//DNA-Encoding RULE #1 A = 00, T=01, G=10, C=11
dna = {}
dna["00"] = "A"
dna["01"] = "T"
dna["10"] = "G"
dna["11"] = "C"
dna["A"] = [0, 0]
dna["T"] = [0, 1]
dna["G"] = [1, 0]
dna["C"] = [1, 1]
//DNA xor
dna["AA"] = dna["TT"] = dna["GG"] = dna["CC"] = "A"
dna["AG"] = dna["GA"] = dna["TC"] = dna["CT"] = "G"
dna["AC"] = dna["CA"] = dna["GT"] = dna["TG"] = "C"
dna["AT"] = dna["TA"] = dna["CG"] = dna["GC"] = "T"
//Maximum time point and total number of time points
tmax, N = 100, 10000


function lorenz(X, t, a, b, c){
    var x, y, z = X;
    x_dot = -a * (x - y);
    y_dot = c * x - y - x * z;
    z_dot = -b * z + x * y;
    return x_dot, y_dot, z_dot
}
    


function image_selector(){
    //returns path to selected image
    var path = "NULL"
    root = tk.Tk()
    root.withdraw()
    path = filedialog.askopenfilename()
    if (path != "NULL"){
        print("Image loaded!")
    }
        
    else{
        print("Error Image not loaded!")
    }
        
    return path
}  


function split_into_rgb_channels(image){
    red = image[x, x, 2]
    green = image[x, x, 1]
    blue = image[x, x, 0]
    return red, green, blue
}
    


//Secure key generation
function securekey(iname){
    img = Image.open(iname)
    m, n = img.size
    print("pixels: {0}  width: {2} height: {1} ".format(m * n, m, n))
    pix = img.load()
    plainimage = list()  //_plainimage contains all the rgb values continuously
    for (let y=0;y<n;y++){
        for (let x=0;x<n;x++){
            for (let k=0;k<3;k++){
                plainimage.append(pix[x, y][k])
            }   
        }    
    }
    key = hashlib.sha256()  //key is made a hash.sha256 object
    key.update(bytearray(plainimage))  //image data is fed to generate digest
    return key.hexdigest(), m, n
}
    


function update_lorentz(key){
    key_bin = bin(int(key, 16))[2+x].zfill(256)  //covert hex key digest to binary
    k = {}  //key dictionary
    key_32_parts = textwrap.wrap(key_bin, 8)  //slicing key into 8 parts
    num = 1
    for (let i=0;i<20;i++){
        k["k{0}".format(num)] = i
        num = num + 1
    }
        
    t1 = t2 = t3 = 0
    for (let i=1;i<12;i++){
        t1 = t1 ^ int(k["k{0}".format(i)], 2)
    }
        
    for (let i=12;i<23;i++){
        t2 = t2 ^ int(k["k{0}".format(i)], 2)
    }
        
    for (let i=23;i<33;i++){
        t3 = t3 ^ int(k["k{0}".format(i)], 2)
    }
        
    let x0, y0, z0;
    x0 = x0 + t1 / 256;
    y0 = y0 + t2 / 256;
    z0 = z0 + t3 / 256;
}
    


function decompose_matrix(iname){
    let image = cv2.imread(iname)
    blue, green, red = split_into_rgb_channels(image)
    for(var values,channels;values<blue,channels<green;values++,channels++){
        img = np.zeros((values.shape[0], values.shape[1]), dtype=np.uint8)
        img[x+1] = (values)
        if (channel == 0){
            B = np.asmatrix(img)
        }
            
        else if(channel == 1){
            G = np.asmatrix(img)
        }
            
        else{
            R = np.asmatrix(img)
        }
    }
        
            
    return B, G, R
}
    


function dna_encode(b, g, r){
    b = np.unpackbits(b, axis=1)
    g = np.unpackbits(g, axis=1)
    r = np.unpackbits(r, axis=1)
    m, n = b.shape
    r_enc = np.chararray((m, int(n / 2)))
    g_enc = np.chararray((m, int(n / 2)))
    b_enc = np.chararray((m, int(n / 2)))

    for (var color=b, enc=b;color<b_enc,enc<b_enc;color++,enc++){
        idx = 0
        for (let j=0;j<m;j++){
            for (let i=0;i<n;i=i+2){
                enc[j, idx] = dna["{0}{1}".format(color[j, i], color[j, i + 1])]
                idx += 1
                if (i == n - 2){
                    idx = 0
                    break
                }
            }
        }
    }
        
            
                
                    

    b_enc = b_enc.astype(str)
    g_enc = g_enc.astype(str)
    r_enc = r_enc.astype(str)
    return b_enc, g_enc, r_enc
}
    


function key_matrix_encode(key, b){
    //encoded key matrix
    b = np.unpackbits(b, axis=1)
    m, n = b.shape
    key_bin = bin(int(key, 16))[2].zfill(256)
    Mk = np.zeros((m, n), dtype=np.uint8)
    x = 0
    for (let j=0;j<m;j++){
        for (let i=0;i<n;i++){
            Mk[j, i] = key_bin[x % 256]
            x += 1
        }
            
    }
        

    Mk_enc = np.chararray((m, int(n / 2)))
    idx = 0
    for (let j=0;j<m;j++){
        for (let i=0;i<n;i=i+2){
            if (idx == (n / 2)){
                idx = 0
            }       
            Mk_enc[j, idx] = dna["{0}{1}".format(Mk[j, i], Mk[j, i + 1])]
            idx += 1
        }       
    }
    Mk_enc = Mk_enc.astype(str)
    return Mk_enc
}
    


function xor_operation(b, g, r, mk){
    m, n = b.shape
    bx = np.chararray((m, n))
    gx = np.chararray((m, n))
    rx = np.chararray((m, n))
    b = b.astype(str)
    g = g.astype(str)
    r = r.astype(str)
    for (let i=0;i<m;i++){
        for (let j=0;j<n;j++){
            bx[i, j] = dna["{0}{1}".format(b[i, j], mk[i, j])]
            gx[i, j] = dna["{0}{1}".format(g[i, j], mk[i, j])]
            rx[i, j] = dna["{0}{1}".format(r[i, j], mk[i, j])]
        }
            
    }
        

    bx = bx.astype(str)
    gx = gx.astype(str)
    rx = rx.astype(str)
    return bx, gx, rx
}
    


function gen_chaos_seq(m, n){
    var x0, y0, z0, a, b, c, N
    N = m * n * 4
    x = np.array((m, n * 4))
    y = np.array((m, n * 4))
    z = np.array((m, n * 4))
    t = np.linspace(0, tmax, N)
    f = odeint(lorenz, (x0, y0, z0), t, args=(a, b, c))
    x, y, z = f.T
    x = x[N-1]
    y = y[(N)-1]
    z = z[(N)-1]
    return x, y, z
}
    


function plot(x, y, z){
    fig = plt.figure()
    ax = fig.gca(projection='3d')
    s = 100
    c = np.linspace(0, 1, N)
    ax.set_axis_off()
    plt.show()
}
    


function sequence_indexing(x, y, z){
    n = len(x)
    fx = np.zeros((n), dtype=np.uint32)
    fy = np.zeros((n), dtype=np.uint32)
    fz = np.zeros((n), dtype=np.uint32)
    seq = sorted(x)
    for (let k1=0;k1<n;k1++){
        t = x[k1]
        k2 = bsearch(seq, t)
        fx[k1] = k2
    }
        
    seq = sorted(y)
    for (let k1=0;k1<n;k1++){
        t = y[k1]
        k2 = bsearch(seq, t)
        fy[k1] = k2
    }

    seq = sorted(z)
    for (let k1=0;k1<n;k1++){
        t = z[k1]
        k2 = bsearch(seq, t)
        fz[k1] = k2
    }
        
    return fx, fy, fz
}
    


function scramble(fx, fy, fz, b, r, g){
    p, q = b.shape
    size = p * q
    bx = b.reshape(size).astype(str)
    gx = g.reshape(size).astype(str)
    rx = r.reshape(size).astype(str)
    bx_s = np.chararray((size))
    gx_s = np.chararray((size))
    rx_s = np.chararray((size))

    for (let i=0;i<size;i++){
        idx = fz[i]
        bx_s[i] = bx[idx]
    }
        
    for (let i=0;i<size;i++){
        idx = fy[i]
        gx_s[i] = gx[idx]
    }
        
    for (let i=0;i<size;i++){
        idx = fx[i]
        rx_s[i] = rx[idx]
    }
        
    bx_s = bx_s.astype(str)
    gx_s = gx_s.astype(str)
    rx_s = rx_s.astype(str)

    b_s = np.chararray((p, q))
    g_s = np.chararray((p, q))
    r_s = np.chararray((p, q))

    b_s = bx_s.reshape(p, q)
    g_s = gx_s.reshape(p, q)
    r_s = rx_s.reshape(p, q)
    return b_s, g_s, r_s
}
    


function scramble_new(fx, fy, fz, b, g, r){
    p, q = b.shape
    size = p * q
    bx = b.reshape(size)
    gx = g.reshape(size)
    rx = r.reshape(size)

    bx_s = b.reshape(size)
    gx_s = g.reshape(size)
    rx_s = r.reshape(size)

    bx = bx.astype(str)
    gx = gx.astype(str)
    rx = rx.astype(str)
    bx_s = bx_s.astype(str)
    gx_s = gx_s.astype(str)
    rx_s = rx_s.astype(str)

    for (let i=0;i<size;i++){
        idx = fz[i]
        bx_s[idx] = bx[i]
    }
        
    for (let i=0;i<size;i++){
        idx = fy[i]
        gx_s[idx] = gx[i]
    }
        
    for (let i=0;i<size;i++){
        idx = fx[i]
        rx_s[idx] = rx[i]
    }
        

    b_s = np.chararray((p, q))
    g_s = np.chararray((p, q))
    r_s = np.chararray((p, q))

    b_s = bx_s.reshape(p, q)
    g_s = gx_s.reshape(p, q)
    r_s = rx_s.reshape(p, q)

    return b_s, g_s, r_s
}
    


function dna_decode(b, g, r){
    m, n = b.shape
    r_dec = np.ndarray((m, int(n * 2)), dtype=np.uint8)
    g_dec = np.ndarray((m, int(n * 2)), dtype=np.uint8)
    b_dec = np.ndarray((m, int(n * 2)), dtype=np.uint8)
    for (var color=b,color=g,color=r,dec=b,dec=g,dec=r;color<b_dec,dec<r_dec;color++,dec++){
        for (let j=0;j<m;j++){
            for (let i=0;i<n;i++){
                dec[j, 2 * i] = dna["{0}".format(color[j, i])][0]
                dec[j, 2 * i + 1] = dna["{0}".format(color[j, i])][1]
            }
        }
    }
        
            
                
    b_dec = (np.packbits(b_dec, axis=-1))
    g_dec = (np.packbits(g_dec, axis=-1))
    r_dec = (np.packbits(r_dec, axis=-1))
    return b_dec, g_dec, r_dec
}
    


function xor_operation_new(b, g, r, mk){
    m, n = b.shape
    bx = np.chararray((m, n))
    gx = np.chararray((m, n))
    rx = np.chararray((m, n))
    b = b.astype(str)
    g = g.astype(str)
    r = r.astype(str)
    for (let i=0;i<m;i++){
        for (let j=0;j<n;j++){
            bx[i, j] = dna["{0}{1}".format(b[i, j], mk[i, j])]
            gx[i, j] = dna["{0}{1}".format(g[i, j], mk[i, j])]
            rx[i, j] = dna["{0}{1}".format(r[i, j], mk[i, j])]
        }
    }

    bx = bx.astype(str)
    gx = gx.astype(str)
    rx = rx.astype(str)
    return bx, gx, rx
}
   


function recover_image(b, g, r, iname){
    img = cv2.imread(iname)
    img[x, x, 2] = r
    img[x, x, 1] = g
    img[x, x, 0] = b
    cv2.imwrite(("encvitdna.jpg"), img)
    print("saved ecrypted image as encvitdna.jpg")
    return img
}
    
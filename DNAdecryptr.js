function decrypt(image, fx, fy, fz, fp, Mk, bt, gt, rt){
    r, g, b = split_into_rgb_channels(image)
    p, q = rt.shape
    benc, genc, renc = dna_encode(b, g, r)
    bs, gs, rs = scramble_new(fx, fy, fz, benc, genc, renc)
    bx, rx, gx = xor_operation_new(bs, gs, rs, Mk)
    blue, green, red = dna_decode(bx, gx, rx)
    green, red = red, green
    img = np.zeros((p, q, 3), dtype=np.uint8)
    img[x, y, 0] = red
    img[x, y, 1] = green
    img[x, y, 2] = blue
}
    
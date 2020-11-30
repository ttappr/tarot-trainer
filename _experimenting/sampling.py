
import random, heapq

# A-Res
# Alternatively r = math.ln(r)/w
def wrsample(stream, weights, k):
    h = []
    for i, w in zip(stream, weights):
        if not w: continue
        r = math.pow(random.random(), (1 / w))
        if len(h) < k:
            heapq.heappush(h, (r, i))
        else:
            if r > h[0][0]:
                heapq.heappop(h)
                heapq.heappush(h, (r, i))
    return h

# A-Chao (not very good)
def wrsample(population, weights, k):
    wsum = 0
    pgen = zip(population, weights)
    samp = []
    for p, w in (next(pgen) for _ in range(k)):
        samp.append(p)
        wsum += w
    for p, w in pgen:
        wsum += w
        prob = w / wsum
        rand = random.random()
        if rand <= prob:
            samp[random.randint(1, k)] = p

# A-ExpJ
def wrsample(population, weights, k):
    h = []
    pwgen = zip(population, weights)
    for p, w in (next(pwgen) for _ in range(k)):
        r = math.pow(random.random(), 1 / w)
        heapq.heappush(h, (r, p))
    x = math.log(random.random()) / math.log(h[0][0])
    for p, w in pwgen:
        x -= w
        if x <= 0:
            t = math.pow(h[0][0], w)
            r = math.pow(random.random() * (1 - t) + 1, 1 / w)
            heapq.heappop(h)
            heapq.heappush(h, (r, p))
            x = math.log(random.random()) / math.log(h[0][0])
    return h
    
